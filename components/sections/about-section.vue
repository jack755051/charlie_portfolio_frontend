<template>
    <ScrollSection ref="aboutSection" id="section1" class="relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <template #content>
            <div class="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
                
                <div class="flex-1 space-y-10">
                    <div class="space-y-4">
                        <h2 class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight">
                            About <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Me.</span>
                        </h2>
                        <h3 class="text-xl font-medium text-slate-500">
                            {{ aboutData.intro.title }}
                        </h3>
                        <p class="text-slate-600 leading-relaxed text-justify">
                            {{ aboutData.intro.content }}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                            {{ aboutData.techStack.title }}
                        </h4>
                        <p class="text-slate-600 leading-relaxed text-justify">
                            {{ aboutData.techStack.content }}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span class="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                            {{ aboutData.experience.title }}
                        </h4>
                        <p class="text-slate-600 leading-relaxed text-justify mb-4">
                            擁有豐富的 B2B 與 B2G 開發經驗，專注於構建高複雜度的管理系統與互動平台。
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all group">
                                <div class="text-xs text-orange-500 font-bold mb-1">Internal Tools</div>
                                <div class="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Systalk AdminHub</div>
                            </div>
                            <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all group">
                                <div class="text-xs text-blue-500 font-bold mb-1">AI Product</div>
                                <div class="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">全球人壽 ICR POC</div>
                            </div>
                            <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all group">
                                <div class="text-xs text-green-500 font-bold mb-1">Audit System</div>
                                <div class="font-bold text-slate-800 group-hover:text-green-600 transition-colors">Systalk.Audit</div>
                            </div>
                             <div class="p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all group">
                                <div class="text-xs text-purple-500 font-bold mb-1">Government</div>
                                <div class="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">原民會知識體系</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-1/3 flex flex-col gap-6 sticky top-24">
                    
                    <div class="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-xl shadow-slate-200/50">
                        <h4 class="font-bold text-slate-800 mb-3">🚀 {{ aboutData.passion.title }}</h4>
                        <p class="text-sm text-slate-600 leading-relaxed mb-4">
                            {{ aboutData.passion.content }}
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in aboutData.tags" :key="tag" 
                                class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                                # {{ tag }}
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button 
                            @click="handlerOpenOtherWindow(ExternalLinks.GITHUB)"
                            class="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                        >
                            <GithubIcon class="w-8 h-8 fill-current" />
                            <span class="text-sm font-bold">Github</span>
                        </button>
                        
                        <button 
                            @click="handlerOpenOtherWindow(ExternalLinks.NPM)"
                            class="flex flex-col items-center justify-center gap-2 p-4 bg-red-600 text-white rounded-xl hover:bg-red-500 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-red-500/30"
                        >
                            <NpmIcon class="w-12 h-8 fill-current" /> <span class="text-sm font-bold">NPM</span>
                        </button>
                    </div>

                    <div class="relative py-4 px-6 border-l-4 border-orange-200 bg-orange-50/50 rounded-r-lg">
                        <p class="text-sm text-slate-600 italic font-medium">
                            "Coding is not just about functionality, it's about creating art in logic."
                        </p>
                    </div>

                </div>
            </div>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
// import ScrollSection from "~/layouts/scrollSection.vue";
import { ExternalLinks } from "~/api/url";
import GithubIcon from "assets/images/git-icon.svg";
import NpmIcon from "assets/images/npm-icon.svg";
import { openExternalLink } from "~/utils/navigation";
import { useAbout } from "~/composables/useAbout";

const aboutData = useAbout();
const handlerOpenOtherWindow = openExternalLink;
</script>

<style scoped>
/* 讓文字閱讀更舒適 */
p {
    letter-spacing: 0.025em;
}
</style>