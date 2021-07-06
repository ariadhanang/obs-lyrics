import { Lyric, LyricContent } from "./lyric"

export class DatabaseSettings {
    lyric?: Lyric
    content?: LyricContent
    status?: string

    constructor(data?: any) {
        if (data !== undefined) {
            this.lyric    = data.lyric      ? data.lyric    : undefined
            this.content  = data.content    ? data.content  : undefined
            this.status   = data.status     ? data.status   : undefined
        }
    }
}