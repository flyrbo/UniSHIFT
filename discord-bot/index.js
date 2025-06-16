import { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donation from '../server/models/Donation.js';
import Enquiry from '../server/models/Enquiry.js';
import { sendResponseEmail } from '../server/utils/emailService.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Bot connected to MongoDB');
  } catch (error) {
    console.error('Bot database connection error:', error);
    process.exit(1);
  }
};

// Register slash commands
const registerCommands = async () => {
  const commands = [
    new SlashCommandBuilder()
      .setName('add')
      .setDescription('Add a new donation to the database')
      .addNumberOption(option =>
        option.setName('amount')
          .setDescription('The donation amount in pounds (e.g., 25.50)')
          .setRequired(true)
          .setMinValue(0.01)
      ),
    
    new SlashCommandBuilder()
      .setName('view')
      .setDescription('View all donations with pagination')
      .addIntegerOption(option =>
        option.setName('page')
          .setDescription('Page number to view (default: 1)')
          .setMinValue(1)
      )
  ];

  try {
    const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
    if (guild) {
      await guild.commands.set(commands);
      console.log('Slash commands registered successfully');
    }
  } catch (error) {
    console.error('Error registering commands:', error);
  }
};

// Handle slash commands
client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === 'add') {
      const amount = interaction.options.getNumber('amount');
      
      const embed = new EmbedBuilder()
        .setTitle('🎯 Confirm Donation Addition')
        .setDescription(`Are you sure you want to add a donation of **£${amount.toFixed(2)}** to the database?`)
        .setColor('#FF6B35')
        .setTimestamp()
        .setFooter({ text: 'UniSHIFT Donation System' });

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`confirm_donation_${amount}`)
            .setLabel('✅ Confirm')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('cancel_donation')
            .setLabel('❌ Cancel')
            .setStyle(ButtonStyle.Danger)
        );

      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }

    if (commandName === 'view') {
      const page = interaction.options.getInteger('page') || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      try {
        const donations = await Donation.find()
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit);

        const total = await Donation.countDocuments();
        const totalPages = Math.ceil(total / limit);

        if (donations.length === 0) {
          const embed = new EmbedBuilder()
            .setTitle('📊 Donation Records')
            .setDescription('No donations found in the database.')
            .setColor('#FF6B35')
            .setTimestamp();

          return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const donationList = donations.map((donation, index) => {
          const number = skip + index + 1;
          const date = new Date(donation.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          return `**${number}.** £${donation.amount.toFixed(2)} - ${date}`;
        }).join('\n');

        const totalAmount = await Donation.aggregate([
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalSum = totalAmount.length > 0 ? totalAmount[0].total : 0;

        const embed = new EmbedBuilder()
          .setTitle('📊 Donation Records')
          .setDescription(donationList)
          .setColor('#FF6B35')
          .setTimestamp()
          .setFooter({ text: `£${totalSum.toFixed(2)} raised | ${total} donations ¦¦ ${page}/${totalPages}` });

        const row = new ActionRowBuilder();
        
        if (page > 1) {
          row.addComponents(
            new ButtonBuilder()
              .setCustomId(`view_donations_${page - 1}`)
              .setLabel('⬅️ Previous')
              .setStyle(ButtonStyle.Primary)
          );
        }

        if (page < totalPages) {
          row.addComponents(
            new ButtonBuilder()
              .setCustomId(`view_donations_${page + 1}`)
              .setLabel('Next ➡️')
              .setStyle(ButtonStyle.Primary)
          );
        }

        const components = row.components.length > 0 ? [row] : [];
        await interaction.reply({ embeds: [embed], components, ephemeral: true });

      } catch (error) {
        console.error('Error fetching donations:', error);
        await interaction.reply({ content: 'Error fetching donation data.', ephemeral: true });
      }
    }
  }

  // Handle button interactions
  if (interaction.isButton()) {
    const customId = interaction.customId;

    if (customId.startsWith('confirm_donation_')) {
      const amount = parseFloat(customId.split('_')[2]);
      
      try {
        const newDonation = new Donation({ amount });
        await newDonation.save();

        const embed = new EmbedBuilder()
          .setTitle('✅ Donation Added Successfully')
          .setDescription(`Donation of **£${amount.toFixed(2)}** has been added to the database.`)
          .addFields(
            { name: '💰 Amount', value: `£${amount.toFixed(2)}`, inline: true },
            { name: '📅 Date', value: new Date().toLocaleDateString('en-GB'), inline: true }
          )
          .setColor('#00FF00')
          .setTimestamp();

        await interaction.update({ embeds: [embed], components: [] });
      } catch (error) {
        console.error('Error adding donation:', error);
        await interaction.update({ 
          content: 'Error adding donation to database.', 
          embeds: [], 
          components: [] 
        });
      }
    }

    if (customId === 'cancel_donation') {
      const embed = new EmbedBuilder()
        .setTitle('❌ Donation Cancelled')
        .setDescription('The donation addition has been cancelled.')
        .setColor('#FF0000')
        .setTimestamp();

      await interaction.update({ embeds: [embed], components: [] });
    }

    if (customId.startsWith('view_donations_')) {
      const page = parseInt(customId.split('_')[2]);
      const limit = 10;
      const skip = (page - 1) * limit;

      try {
        const donations = await Donation.find()
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit);

        const total = await Donation.countDocuments();
        const totalPages = Math.ceil(total / limit);

        const donationList = donations.map((donation, index) => {
          const number = skip + index + 1;
          const date = new Date(donation.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          return `**${number}.** £${donation.amount.toFixed(2)} - ${date}`;
        }).join('\n');

        const totalAmount = await Donation.aggregate([
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalSum = totalAmount.length > 0 ? totalAmount[0].total : 0;

        const embed = new EmbedBuilder()
          .setTitle('📊 Donation Records')
          .setDescription(donationList)
          .setColor('#FF6B35')
          .setTimestamp()
          .setFooter({ text: `£${totalSum.toFixed(2)} raised | ${total} donations ¦¦ ${page}/${totalPages}` });

        const row = new ActionRowBuilder();
        
        if (page > 1) {
          row.addComponents(
            new ButtonBuilder()
              .setCustomId(`view_donations_${page - 1}`)
              .setLabel('⬅️ Previous')
              .setStyle(ButtonStyle.Primary)
          );
        }

        if (page < totalPages) {
          row.addComponents(
            new ButtonBuilder()
              .setCustomId(`view_donations_${page + 1}`)
              .setLabel('Next ➡️')
              .setStyle(ButtonStyle.Primary)
          );
        }

        const components = row.components.length > 0 ? [row] : [];
        await interaction.update({ embeds: [embed], components });

      } catch (error) {
        console.error('Error fetching donations:', error);
        await interaction.update({ content: 'Error fetching donation data.' });
      }
    }

    if (customId.startsWith('respond_question_')) {
      const enquiryId = customId.split('_')[2];
      
      const modal = new ModalBuilder()
        .setCustomId(`response_modal_${enquiryId}`)
        .setTitle('Respond to Question');

      const responseInput = new TextInputBuilder()
        .setCustomId('response_text')
        .setLabel('Your Response')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Type your response here...')
        .setRequired(true)
        .setMaxLength(2000);

      const actionRow = new ActionRowBuilder().addComponents(responseInput);
      modal.addComponents(actionRow);

      await interaction.showModal(modal);
    }
  }

  // Handle modal submissions
  if (interaction.isModalSubmit()) {
    if (interaction.customId.startsWith('response_modal_')) {
      const enquiryId = interaction.customId.split('_')[2];
      const response = interaction.fields.getTextInputValue('response_text');

      try {
        const enquiry = await Enquiry.findById(enquiryId);
        if (!enquiry) {
          return await interaction.reply({ content: 'Enquiry not found.', ephemeral: true });
        }

        // Update enquiry status and response
        await Enquiry.findByIdAndUpdate(enquiryId, {
          status: 'responded',
          response: response
        });

        // Send email response
        const emailSent = await sendResponseEmail(enquiry.email, enquiry.question, response);

        const embed = new EmbedBuilder()
          .setTitle(emailSent ? '✅ Response Sent Successfully' : '⚠️ Response Saved (Email Failed)')
          .setDescription(emailSent ? 
            `Your response has been sent to **${enquiry.email}**` : 
            `Response saved but email delivery failed. Please contact **${enquiry.email}** manually.`)
          .addFields(
            { name: '📧 Email', value: enquiry.email, inline: true },
            { name: '📝 Response', value: response.length > 100 ? response.substring(0, 100) + '...' : response }
          )
          .setColor(emailSent ? '#00FF00' : '#FFA500')
          .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });

      } catch (error) {
        console.error('Error sending response:', error);
        await interaction.reply({ content: 'Error processing response.', ephemeral: true });
      }
    }
  }
});

// Monitor for new enquiries and send to Discord channel
const monitorEnquiries = () => {
  const changeStream = mongoose.connection.db.collection('enquiries').watch();
  
  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const enquiry = change.fullDocument;
      const channel = client.channels.cache.get(process.env.DISCORD_QUESTIONS_CHANNEL_ID);
      
      if (channel) {
        const embed = new EmbedBuilder()
          .setTitle('❓ New Question Received')
          .setDescription(enquiry.question)
          .addFields(
            { name: '📧 Email', value: enquiry.email, inline: true },
            { name: '📅 Received', value: new Date(enquiry.createdAt).toLocaleString('en-GB'), inline: true }
          )
          .setColor('#FF6B35')
          .setTimestamp()
          .setFooter({ text: enquiry.email });

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`respond_question_${enquiry._id}`)
              .setLabel('📝 Respond')
              .setStyle(ButtonStyle.Primary)
          );

        try {
          const message = await channel.send({ embeds: [embed], components: [row] });
          
          // Update enquiry with Discord message ID
          await Enquiry.findByIdAndUpdate(enquiry._id, {
            discordMessageId: message.id
          });
        } catch (error) {
          console.error('Error sending enquiry to Discord:', error);
        }
      }
    }
  });
};

client.once('ready', async () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  await connectDB();
  await registerCommands();
  
  // Start monitoring enquiries after a short delay to ensure connection is stable
  setTimeout(monitorEnquiries, 5000);
});

client.login(process.env.DISCORD_TOKEN);