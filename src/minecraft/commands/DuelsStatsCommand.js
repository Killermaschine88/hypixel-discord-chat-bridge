const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class DuelsStatsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "duels";
    this.aliases = ["duel"];
    this.description = "Duel stats of specified user.";
    this.options = [
      {
        name: "username",
        description: "Minecraft username",
        required: false,
      },
      {
        name: "duel",
        description: "Type of duel",
        required: false,
        choices: [
          { name: "Blitz", value: "blitz" },
          { name: "UHC", value: "uhc" },
          { name: "Parkour", value: "parkour" },
          { name: "Boxing", value: "boxing" },
          { name: "Bow Spleef", value: "bowspleef" },
          { name: "Spleef", value: "spleef" },
          { name: "Arena", value: "arena" },
          { name: "Mega Walls", value: "megawalls" },
          { name: "OP", value: "op" },
          { name: "Sumo", value: "sumo" },
          { name: "Classic", value: "classic" },
          { name: "Combo", value: "combo" },
          { name: "Bridge", value: "bridge" },
          { name: "No Debuff", value: "nodebuff" },
          { name: "Bow", value: "bow" },
        ],
      },
    ]
  }

  async onCommand(username, message) {
    try {
      const duelTypes = [
        "blitz",
        "uhc",
        "parkour",
        "boxing",
        "bowspleef",
        "spleef",
        "arena",
        "megawalls",
        "op",
        "sumo",
        "classic",
        "combo",
        "bridge",
        "nodebuff",
        "bow",
      ];
      const arg = this.getArgs(message) ?? [username];
      let duel;

      if (!arg || !arg[0] || arg[0].includes("/")) arg[0] = username;

      if (duelTypes.includes(arg[0].toLowerCase())) {
        duel = arg[0].toLowerCase();
        if (arg[1] && !arg[1].includes("/")) {
          username = arg[1];
        }
      } else {
        username = arg[0];

        if (arg[1] && duelTypes.includes(arg[1].toLowerCase())) {
          duel = arg[1].toLowerCase();
        }
      }

      hypixel.getPlayer(username).then((player) => {
        if (!duel) {
          this.send(
            `/gc [Duels] [${player.stats.duels.division}] ${username} Wins: ${player.stats.duels.wins} | CWS: ${player.stats.duels.winstreak} | BWS: ${player.stats.duels.bestWinstreak} | WLR: ${player.stats.duels.WLRatio}`
          );
        } else {
          if (
            Object?.keys(player?.stats?.duels?.[duel]).includes("overall") ||
            Object?.keys(player?.stats?.duels?.[duel]).includes("1v1")
          ) {
            this.send(
              `/gc [${duel.toUpperCase() ?? "Unknown"}] [${
                player.stats.duels?.[duel]?.[
                  Object.keys(player.stats.duels[duel])[0]
                ]?.division ?? "Unknown"
              }] ${username ?? 0} Wins: ${
                player.stats.duels?.[duel]?.[
                  Object.keys(player.stats.duels[duel])[0]
                ]?.wins ?? 0
              } | CWS: ${
                player.stats.duels?.[duel]?.[
                  Object.keys(player.stats.duels[duel])[0]
                ]?.winstreak ?? 0
              } | BWS: ${
                player.stats.duels?.[duel]?.[
                  Object.keys(player.stats.duels[duel])[0]
                ]?.bestWinstreak ?? 0
              } | WLR: ${
                player.stats.duels?.[duel]?.[
                  Object.keys(player.stats.duels[duel])[0]
                ]?.WLRatio ?? 0
              }`
            );
          } else {
            this.send(
              `/gc [${duel.toUpperCase() ?? "Unknown"}] [${
                player.stats.duels?.[duel]?.division ?? "Unknown"
              }] ${username ?? 0} Wins: ${
                player.stats.duels?.[duel]?.wins ?? 0
              } | CWS: ${player.stats.duels?.[duel]?.winstreak ?? 0} | BWS: ${
                player.stats.duels?.[duel]?.bestWinstreak ?? 0
              } | WLR: ${player.stats.duels?.[duel]?.WLRatio ?? 0}`
            );
          }
        }
      });
    } catch (error) {
      this.send(`/gc ${error.toString().replace("[hypixel-api-reborn] ", "")}`);
    }
  }
}

module.exports = DuelsStatsCommand;
