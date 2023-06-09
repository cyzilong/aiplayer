'use client';

import { line_13 } from "./13";
import { line_14 } from "./14";
import { line_15 } from "./15";

interface Station {
  name: string;
  line: string;
}

interface TimeTable {
  terminus: Record<string, string>;
  times: string[];
  half: Record<string, string>;
}

export type Line = Record<string, Record<string, TimeTable>>

const stations: Station[] = [
  {
    name: '望京南',
    line: '14号线',
  },
  {
    name: '望京',
    line: '15号线',
  },
  {
    name: '望京西',
    line: '13号线',
  },
];

const times: Record<string, Line> = {
  '13号线': line_13,
  '15号线': line_15,
  '14号线': line_14,
}


interface NextTime {
  time: string;
  isHalf: boolean;
  terminus: string;
}

function getNextTimes(conf: TimeTable): NextTime[] {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentKey = hours * 100 + minutes;

  const nextTimes = [];
  for (let i = 0; i < conf.times.length; i++) {
    const time = conf.times[i];
    const timeInt = parseInt(time.replace(':', ''));
    const isHalf = !!conf.half[time] || false;

    if (timeInt > currentKey) {
      nextTimes.push({
        time,
        isHalf,
        terminus: conf.terminus[isHalf ? conf.half[time] : 'default'],
      });

      if (nextTimes.length === 3) {
        break;
      }
    }
  }
  return nextTimes;
}


export interface Config {
  line: string;
  name: string;
  my_direction: string;
  direction: string;
  nextTimes: NextTime[];
}

export function getConfig(): Config[] {
  const result = [];
  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    const stationConf = times[station.line][station.name];
    if (stationConf.up) {
      result.push({
        line: station.line,
        name: station.name,
        my_direction: stationConf.up.terminus.my_direction,
        direction: stationConf.up.terminus.default,
        nextTimes: getNextTimes(stationConf.up),
      });
    }
    if (stationConf.down) {
      result.push({
        line: station.line,
        name: station.name,
        my_direction: stationConf.down.terminus.my_direction,
        direction: stationConf.down.terminus.default,
        nextTimes: getNextTimes(stationConf.down),
      });
    }
  }
  return result;
}