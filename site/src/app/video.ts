import { Sub } from './sub';

export class Video {
  index: string;
  vimeo_link: string;
  participant_name: string;
  activity: string;
  subtitleFname: string;
  //subs: Array<Object>;
  subs: Array<{index: string, timecode: string, text: string}>;
}
