import { Player } from "./Player";

export interface Chat
{
    player: Player;
    message: string;
    date: string;
}