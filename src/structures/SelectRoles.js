
const { MessageSelectMenu, MessageActionRow } = require("discord.js")
const botConfig = require("../../bot.config")

class SelectRoles {
    constructor ({ interaction: interaction }) {
        this.interaction = interaction

        
    }
    async pronounMenu() {

        let pronounMenu = new MessageSelectMenu()
        .setCustomId("pronounMenu")
        .setMinValues(0)
        .setMaxValues(7)
        .setPlaceholder("Select some pronouns!")
        .setOptions({
            label: "He/Him",
            value: "select_" + botConfig.roles.pronounRoles.hehim,
            emoji: "939674169430409236",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.hehim),
        }, {
            label: "She/Her",
            value: "select_" + botConfig.roles.pronounRoles.sheher,
            emoji: "939674772332232714",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.sheher),
        }, {
            label: "They/Them",
            value: "select_" + botConfig.roles.pronounRoles.theythem,
            emoji: "939675352375132181",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.theythem),
        }, {
            label: "He/They",
            value: "select_" + botConfig.roles.pronounRoles.hethey,
            emoji: "940253342574182450",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.hethey),
        }, {
            label: "She/They",
            value: "select_" + botConfig.roles.pronounRoles.shethey,
            emoji: "940254292227538986",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.shethey),
        }, {
            label: "Any Pronouns",
            value: "select_" + botConfig.roles.pronounRoles.any,
            emoji: "939677629735370762",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.any),
        }, {
            label: "Neopronouns",
            value: "select_" + botConfig.roles.pronounRoles.neo,
            emoji: "939676619600175126",
            default: this.interaction.member.roles.cache.has(botConfig.roles.pronounRoles.neo),
        })

        await this.interaction.followUp({
            components: [new MessageActionRow().addComponents(pronounMenu)]
        })
    }

    async foodiesMenu() {
        let foodieMenu = new MessageSelectMenu()
        .setCustomId("foodieMenu")
        .setMinValues(0)
        .setMaxValues(3)
        .setPlaceholder("Select some foodies!")
        .setOptions({
            label: "Fruit Bowls",
            value: "select_" + botConfig.roles.fooideRoles.fruitBowls,
            emoji: "997155704651649025",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.fruitBowls),
        }, {
            label: "Fast Food",
            value: "select_" + botConfig.roles.fooideRoles.fastFood,
            emoji: "997156207364153415",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.fastFood),
        }, {
            label: "Sea Food",
            value: "select_" + botConfig.roles.fooideRoles.seaFood,
            emoji: "997157223983743130",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.seaFood),
        }, {
            label: "Brunch Food",
            value: "select_" + botConfig.roles.fooideRoles.brunchFood,
            emoji: "997157904979329234",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.brunchFood),
        }, {
            label: "Smoothies",
            value: "select_" + botConfig.roles.fooideRoles.smoothies,
            emoji: "997158655659089981",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.smoothies),
        }, {
            label: "Desserts",
            value: "select_" + botConfig.roles.fooideRoles.desserts,
            emoji: "997159654134124616",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.desserts),
        }, {
            label: "Soups",
            value: "select_" + botConfig.roles.fooideRoles.soups,
            emoji: "991323484661751838",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.soups),
        }, {
            label: "Salads",
            value: "select_" + botConfig.roles.fooideRoles.salads,
            emoji: "997160988442898452",
            default: this.interaction.member.roles.cache.has(botConfig.roles.fooideRoles.salads),
        })

        await this.interaction.followUp({
            components: [new MessageActionRow().addComponents(foodieMenu)]
        })
    }

    async bellMenu() {
        let bellMenu = new MessageSelectMenu()
        .setCustomId("bellMenu")
        .setMinValues(0)
        .setMaxValues(3)
        .setPlaceholder("Select some bells!")
        .setOptions({
            label: "Announcement Bell",
            value: "select_" + botConfig.roles.bellRoles.announcements,
            description: "This role will be pinged for any server related news.",
            emoji: "📣",
            default: this.interaction.member.roles.cache.has(botConfig.roles.bellRoles.announcements),
        }, {
            label: "Event Bell",
            value: "select_" + botConfig.roles.bellRoles.events,
            description: "This role will be pinged for any server events.",
            emoji: "🏆",
            default: this.interaction.member.roles.cache.has(botConfig.roles.bellRoles.events),
        }, {
            label: "Food of the Week Bell",
            value: "select_" + botConfig.roles.bellRoles.foodOfTheWeek,
            description: "The role will be pinged weekly for the food of the week.",
            emoji: "🍗",
            default: this.interaction.member.roles.cache.has(botConfig.roles.bellRoles.foodOfTheWeek),
        })

        await this.interaction.followUp({
            components: [new MessageActionRow().addComponents(bellMenu)]
        })
    }

}

module.exports = SelectRoles