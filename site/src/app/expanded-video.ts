import { Sub } from './sub';

export class ExpandedVideo {
  index: string;
  vimeo_link: string;
  subtitleFname: string;
  participant_name: string;
  activity:string;
  //subs: Array<Object>;
  subs: Array<{index: string, timecode: string, text: string}>;
  show: boolean;
  current_time_code:string;
}
