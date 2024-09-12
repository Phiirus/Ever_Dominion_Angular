import { Troop } from "./Troop";

export interface PvePlayer
{
    id:number;
    nick: string;
    gold: number;
    icon: string;
    pveMinDmg: number;
    pveMaxDmg: number;
    pveHealth: number;
    description: string;

    pveTroops: Troop[];
}