import type { Component } from 'vue';

export interface ITechnologyStack{
    title: string,
    stack: ITechnologyStackItem[],
    /**用來存放未知數量的class */
    classGroup?: IClassGroup;
}

export interface ITechnologyStackItem{
    stackName: string,
    icon: string,
}

// classGroup 中可包含任意 key（如 title、footer、body 等）
export interface IClassGroup {
  [key: string]: ClassType | undefined;
}

// 合法定義 classType：允許陣列或物件形式
export type ClassType = string[] | { [key: string]: boolean };

export interface ITechnologyStackItemWithComponent extends ITechnologyStackItem{
    iconComponent?: Component,
}

export interface ITechnologyStackWithComponent{
    title: string,
    stack: ITechnologyStackItemWithComponent[],
    classGroup?: IClassGroup;
}