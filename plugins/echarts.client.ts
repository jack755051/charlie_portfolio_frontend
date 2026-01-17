import { use } from 'echarts/core';

// 手动导入ECharts模块以减小包的大小
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';

export default defineNuxtPlugin(() => {
    use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);
});