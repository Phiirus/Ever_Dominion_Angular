import { Player } from "./Player";

export interface Notify
{
    attacker: Player;
    defender: Player;
    result: string;
    date: Date;
    read: boolean;
}