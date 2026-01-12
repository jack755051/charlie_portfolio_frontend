// 集中管理所有 SVG 圖標的導入和映射
import AngularIcon from "@/assets/image/angular-icon.svg?component";
import VueIcon from "@/assets/image/vue-icon.svg?component";
import MysqlIcon from "@/assets/image/mysql-icon.svg?component";
import MongoDBIcon from "@/assets/image/mongodb-icon.svg?component";
import DockerIcon from "@/assets/image/docker-icon.svg?component";
import NestJSIcon from "@/assets/image/nestjs-icon.svg?component";
import NgrxIcon from "@/assets/image/ngrx-icon.svg?component";
import NpmIcon from "@/assets/image/npm-icon.svg?component";
import ReactIcon from "@/assets/image/react-icon.svg?component";
import GitIcon from "@/assets/image/git-icon.svg?component";
import EchartIcon from "@/assets/image/echart-icon.svg?component";
import NuxtIcon from "@/assets/image/nuxt-icon.svg?component";
import NextIcon from "@/assets/image/nextjs-icon.svg?component";
import NodeJSIcon from "@/assets/image/nodejs-icon.svg?component";
import RxJSIcon from "@/assets/image/rxjs-icon.svg?component";
import AntDesignIcon from "@/assets/image/antdesign-icon.svg?component";
import TailwindIcon from "@/assets/image/tailwindcss-icon.svg?component";
import NvmIcon from "@/assets/image/nvm-icon.svg?component"; 
import ShadcnIcon from "@/assets/image/shadcn-icon.svg?component";
import Bootstrap from "@/assets/image/bootstrap-icon.svg?component";
import PiniaIcon from "@/assets/image/pinia-icon.svg?component";

// 圖標組件映射表
export const iconComponentMap = {
  'AngularIcon': AngularIcon,
  'VueIcon': VueIcon,
  'MysqlIcon': MysqlIcon,
  'MongoDBIcon': MongoDBIcon,
  'DockerIcon': DockerIcon,
  'NestJSIcon': NestJSIcon,
  'NgrxIcon': NgrxIcon,
  'NpmIcon': NpmIcon,
  'ReactIcon': ReactIcon,
  'GitIcon': GitIcon,
  'NvmIcon': NvmIcon,
  'NuxtIcon': NuxtIcon,
  'NextIcon': NextIcon,
  'ShadcnIcon': ShadcnIcon,
  'BootstrapIcon': Bootstrap,
  'PiniaIcon': PiniaIcon,
  // 為沒有對應 SVG 檔案的技術提供預設圖標或 null
  'NodeJSIcon': NodeJSIcon, // 暫時使用 NPM 圖標
  'RxJSIcon': RxJSIcon, // 暫時使用 Ngrx 圖標
  'EchartIcon': EchartIcon, // 暫時使用 React 圖標
  'AngularMaterialIcon': AngularIcon, // 暫時使用 Angular 圖標
  'AntDesignIcon': AntDesignIcon, // 暫時使用 React 圖標
  'TailWindIcon': TailwindIcon, // 暫時使用 Git 圖標
};

// 根據字串名稱獲取對應的圖標組件
export const getIconComponent = (iconName: string) => {
  return iconComponentMap[iconName as keyof typeof iconComponentMap] || null;
};

// 獲取所有可用的圖標名稱
export const getAvailableIconNames = () => {
  return Object.keys(iconComponentMap);
};
