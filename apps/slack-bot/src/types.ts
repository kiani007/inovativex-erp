import type { RespondFn, SlashCommand, WebClient } from "@slack/bolt";

export interface SlackCommandContext {
  command: SlashCommand;
  respond: RespondFn;
  client: WebClient;
  body: Record<string, unknown>;
  userId: string;
  channelId: string;
  args: string[];
  rawText: string;
}
