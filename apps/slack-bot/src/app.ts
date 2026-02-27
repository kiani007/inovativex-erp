import "dotenv/config";
import { App, LogLevel } from "@slack/bolt";

// Import command handlers
import { registerHelpCommand } from "./commands/help";
import { registerLeaveCommands } from "./commands/leave";
import { registerAttendanceCommands } from "./commands/attendance";
import { registerProjectCommands } from "./commands/project";
import { registerEmployeeCommands } from "./commands/employee";
import { registerFinanceCommands } from "./commands/finance";
import { registerAssetCommands } from "./commands/asset";
import { registerStandupCommands } from "./commands/standup";
import { registerApprovalCommands } from "./commands/approval";

// Import event handlers
import { registerAppHomeEvent } from "./events/app-home";
import { registerMemberJoinEvent } from "./events/member-join";

// Import middleware
import { authMiddleware } from "./middleware/auth";

// Initialize the Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.INFO,
});

// Global middleware
app.use(authMiddleware);

// ============================================================
// Register all /erp command handlers
// ============================================================

// The /erp command is the single entry point
// Sub-commands are parsed from the text parameter
app.command("/erp", async ({ command, ack, respond, client, body }) => {
  await ack();

  const args = command.text.trim().split(/\s+/);
  const subCommand = args[0]?.toLowerCase() || "help";
  const subArgs = args.slice(1);

  const context = {
    command,
    respond,
    client,
    body,
    userId: command.user_id,
    channelId: command.channel_id,
    args: subArgs,
    rawText: command.text,
  };

  try {
    switch (subCommand) {
      // General
      case "help":
        return await registerHelpCommand(context);
      case "whoami":
        return await registerEmployeeCommands(context, "whoami");

      // Employee
      case "directory":
        return await registerEmployeeCommands(context, "directory");
      case "employee":
        return await registerEmployeeCommands(context, "profile");
      case "org-chart":
        return await registerEmployeeCommands(context, "org-chart");

      // Leave & Attendance
      case "leave":
        return await registerLeaveCommands(context, subArgs[0] || "balance");
      case "attendance":
        return await registerAttendanceCommands(context, subArgs[0] || "status");
      case "clockin":
        return await registerAttendanceCommands(context, "clockin");
      case "clockout":
        return await registerAttendanceCommands(context, "clockout");
      case "payslip":
        return await registerLeaveCommands(context, "payslip");

      // Projects
      case "project":
        return await registerProjectCommands(context, subArgs[0] || "list");
      case "sprint":
        return await registerProjectCommands(context, "sprint");
      case "standup":
        return await registerStandupCommands(context, subArgs[0] || "submit");
      case "timetrack":
        return await registerProjectCommands(context, `timetrack-${subArgs[0] || "status"}`);

      // Finance
      case "invoice":
        return await registerFinanceCommands(context, subArgs[0] || "list");
      case "expense":
        return await registerFinanceCommands(context, subArgs[0] || "list");
      case "budget":
        return await registerFinanceCommands(context, "budget");

      // Client
      case "client":
        return await registerFinanceCommands(context, "client");
      case "deal":
        return await registerFinanceCommands(context, "deal");
      case "pipeline":
        return await registerFinanceCommands(context, "pipeline");

      // Assets
      case "assets":
        return await registerAssetCommands(context, subArgs[0] || "mine");

      // Recruitment
      case "openings":
        return await registerEmployeeCommands(context, "openings");
      case "referral":
        return await registerEmployeeCommands(context, "referral");

      // Approvals
      case "approvals":
        return await registerApprovalCommands(context, "list");
      case "approve":
        return await registerApprovalCommands(context, "approve");
      case "reject":
        return await registerApprovalCommands(context, "reject");

      // Dashboard
      case "dashboard":
      case "stats":
        return await respond({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Inovativex Dashboard*\n\nView your full dashboard at: <https://erp.inovativex.com/dashboard|Open Dashboard>",
              },
            },
          ],
        });

      default:
        return await respond({
          text: `Unknown command: \`${subCommand}\`. Use \`/erp help\` to see available commands.`,
        });
    }
  } catch (error) {
    console.error(`Error handling /erp ${subCommand}:`, error);
    await respond({
      text: `Something went wrong processing your request. Please try again or contact support.`,
    });
  }
});

// ============================================================
// Register event handlers
// ============================================================

registerAppHomeEvent(app);
registerMemberJoinEvent(app);

// ============================================================
// Start the app
// ============================================================

(async () => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  await app.start(port);
  console.log(`Inovativex ERP Slack Bot is running on port ${port}`);
})();
