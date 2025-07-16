export interface ITimelineItem{
    /** 時間點類型 */
    type: 'color-pointer' | 'custom'
    /** 時間點顏色 */
    color?: string
    /** 自定義時間點類型 */
    customPointerIcon?: string
    /** 時間點標題 */
    title: string
    /** 時間 */
    time?: string
    /** 時間點內容 */
    content: string | string[]
}

export interface ITimeline {
    /** 時間軸類型 */
    type: 'right' | 'left' | 'alternate'
    /** 時間軸數據 */
    data: ITimelineItem[]
}