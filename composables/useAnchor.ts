import type { IAnchor } from "~/types/anchor.interface";

export const useAnchor = () => {
    
    /**首頁頁面錨點*/
    const anchorHomePage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '首頁' },
    ]);
    /**關於頁面錨點*/
    const anchorAboutPage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '關於我' },
        { key: 'section2', href: '#section2', title: '我的經驗' },
        { key: 'section3', href: '#section3', title: '我的技術棧' },
        { key: 'section4', href: '#section4', title: 'Leetcode挑戰' }
    ]);
    /**作品集頁面錨點*/
    const anchorPortfolioPage = ref<IAnchor[]>([
        { key: 'section1', href: '#section1', title: '作品集' }
    ]);

    return {
        anchorHomePage,
        anchorAboutPage,
        anchorPortfolioPage
    }
}