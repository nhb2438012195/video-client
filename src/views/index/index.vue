<template>
    <div>
        <!-- 粘性头部导航栏 -->
        <div v-show="isFixHeaderBar"
            class=" max-w-full mx-auto fixed z-[52]   !px-[24px] bg-indigo-400  !w-full top-0 !h-[64px]">
            <div ref="areaB"></div>
        </div>
        <!-- 粘性头部导航栏 -->
        <BaseFullPageContainer>
            <!-- 头部 导航栏 -->
            <template #header1>
                <div class="  !h-[155px]  flex flex-col justify-between  bg-cover bg-center "
                    :style="{ backgroundImage: 'url(' + bgimg + ')' }">
                    <div ref="areaA"></div>
                </div>
            </template>
            <!-- 头部 导航栏 -->

            <!-- 中间 分类 -->
            <template #header2>

                <!-- 动态热门 -->
                <BaseFlexDiv class="w-[10%] grid-cols-2 2xl:gap-6 xl:gap-4 gap-2 ml-3">
                    <div class="">
                        <BaseContainer class="" @click="clickTag()">
                            <ButtonLabel class=" !text-black text-[14px]" bgColor="" hoverEffect="" text="动态">
                            </ButtonLabel>
                            <template #top>
                                <el-icon class=" overflow-hidden rounded-full !w-[46px] !h-[46px] !text-black">
                                    <img :src="dynamicimg"></img>
                                </el-icon>
                            </template>
                        </BaseContainer>
                    </div>
                    <div class="">
                        <BaseContainer class="" @click="clickTag()">
                            <ButtonLabel class=" !text-black text-[14px]" bgColor="" hoverEffect="" text="动态">
                            </ButtonLabel>
                            <template #top>
                                <el-icon class=" overflow-hidden rounded-full !w-[46px] !h-[46px] !text-black">
                                    <img :src="dynamicimg"></img>
                                </el-icon>
                            </template>
                        </BaseContainer>
                    </div>
                </BaseFlexDiv>
                <!-- 动态热门 -->

                <!-- 分类 -->
                <div class="  w-[70.39660056%]  2xl:aspect-[964/74] aspect-[964/80] pr-[30px]">
                    <BaseFlexDiv
                        class="grid  grid-cols-8  sm:grid-cols-10 md:grid-cols-11 lg:grid-cols-12  2xl:gap-2 gap-1 ">
                        <div v-for="i in 24" :key="i" class=" ">
                            <CategoryButton></CategoryButton>
                            <!-- 内容区域 -->
                        </div>
                    </BaseFlexDiv>
                </div>
                <!-- 分类 -->

                <!-- 分割线 -->
                <div class="h-2/3 w-[1px]   bg-slate-300"></div>
                <!-- 分割线 -->

                <!-- 右侧分类 -->
                <div class="w-[18.27195467%]  h-[258/74] ">
                    <BaseFlexDiv class="overflow-hidden grid grid-cols-[1fr_1fr_1.5fr]  ">
                        <CategoryButton2 text="专栏">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>

                        <CategoryButton2 text="专栏">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>
                        <CategoryButton2 text="专栏">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>
                        <CategoryButton2 text="专栏">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>
                        <CategoryButton2 text="专栏">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>
                        <CategoryButton2 text="新歌热搜">
                            <div class="hidden lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24" width="24" height="24"
                                    class=" side-icon !h-[20px] !w-[20px]"><!--[-->
                                    <path class=" !h-[20px] !w-[20px]" d="M0 0L24 0L24 24L0 24L0 0z" fill="#F7F7F703">
                                    </path>
                                    <path
                                        d="M18 4.8L6 4.8C5.33726 4.8 4.8 5.33726 4.8 6L4.8 18C4.8 18.66276 5.33726 19.2 6 19.2L18 19.2C18.66276 19.2 19.2 18.66276 19.2 18L19.2 6C19.2 5.33726 18.66276 4.8 18 4.8z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M4 5.99998C4 4.89541 4.89544 3.99997 6 3.99997L18 3.99997C19.1046 3.99997 20.00004 4.89541 20.00004 5.99998L20.00004 18C20.00004 19.1046 19.1046 19.99992 18 19.99992L6 19.99992C4.89544 19.99992 4 19.1046 4 18L4 5.99998zM6 5.59998C5.77909 5.59998 5.6 5.77907 5.6 5.99998L5.6 18C5.6 18.22092 5.77908 18.39996 6 18.39996L18 18.39996C18.22092 18.39996 18.39996 18.22092 18.39996 18L18.39996 5.99998C18.39996 5.77906 18.22092 5.59998 18 5.59998L6 5.59998z"
                                        fill="#61666Dff"></path>
                                    <path
                                        d="M15.99996 11.19931L8 11.19931C7.55818 11.19931 7.2 11.55749 7.2 11.99932C7.2 12.44112 7.55818 12.79932 8 12.79932L15.99996 12.79932C16.4418 12.79932 16.8 12.44112 16.8 11.99932C16.8 11.55749 16.4418 11.19931 15.99996 11.19931z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M15.99996 8.00062L8 8.00062C7.55818 8.00062 7.2 8.35878 7.2 8.80061C7.2 9.24244 7.55818 9.60061 8 9.60061L15.99996 9.60061C16.4418 9.60061 16.8 9.24244 16.8 8.80061C16.8 8.35878 16.4418 8.00062 15.99996 8.00062z"
                                        fill="#ffffffff"></path>
                                    <path
                                        d="M11.2 14.4L8 14.4C7.55818 14.4 7.2 14.7582 7.2 15.20004C7.2 15.64188 7.55818 15.99996 8 15.99996L11.2 15.99996C11.64182 15.99996 12 15.64188 12 15.20004C12 14.7582 11.64182 14.4 11.2 14.4z"
                                        fill="#ffffffff"></path><!--]-->
                                </svg>
                            </div>
                        </CategoryButton2>
                    </BaseFlexDiv>
                    <!-- 内容区域 -->
                </div>
                <!-- 右侧分类 -->

            </template>
            <!-- 中间 分类 -->

            <!-- 主体 内容 -->
            <template #main>
                <div class="w-full max-w-full mx-auto   ">
                    <!-- 响应式网格容器 -->
                    <div class="grid  grid-cols-4  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        <!-- 大卡片 -->
                        <div
                            class="col-span-2 row-span-2 aspect-[552.79/394.69] bg-slate-600 rounded-xl overflow-hidden shadow-md">
                            <!-- 内容区域（可放图片、标题等） -->
                        </div>
                        <!-- 小卡片-->
                        <div v-for="card in videoCardStore.DynamicVideoCard" :key="card.id" :data="card"
                            class="!z-0 aspect-[266.41/224.84] bg-slate-600 overflow-hidden rounded-lg">
                            <VideoCard :id="card.id">
                            </VideoCard>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 主体 内容 -->

        </BaseFullPageContainer>
        <!-- 可移动的导航栏 -->
        <Teleport v-if="targetElement" :to="targetElement">
            <HeaderNavBar class="text-white ">
            </HeaderNavBar>
        </Teleport>
        <!-- 可移动的导航栏 -->
    </div>
</template>
<script setup>

import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useUserStore, useVideoCardStore, usePublicStore } from '@/store';
import { ElMessage } from 'element-plus'; // 如果你用的是 Element Plus
// 组件导入
import BaseFullPageContainer from '@/views/components/BaseFullPageContainer.vue';
import ButtonLabel from '@/views/components/ButtonLabel.vue';
import BaseContainer from '@/views/components/BaseContainer.vue';
import BaseFlexDiv from '@/views/components/BaseFlexDiv.vue';
import CategoryButton from './children/CategoryButton.vue';
import CategoryButton2 from './children/CategoryButton2.vue';
import VideoCard from '@/views/components/videoCard/VideoCard.vue';
import HeaderNavBar from '@/views/components/headerNavBar/HeaderNavBar.vue';
//Store
const userStore = useUserStore();
const videoCardStore = useVideoCardStore();
const publicStore = usePublicStore();
//属性
const isFixHeaderBar = ref(false);
const bgimg = ref('/123cec01a7bde68ab530f773ed179c4f.png');
const dynamicimg = ref('http://120.26.137.2:9000/public/DefaultImage.png');
const areaA = ref(null)
const areaB = ref(null)
// ====== 方法 ======

// 动态计算目标 DOM 元素
const targetElement = computed(() => {
    if (isFixHeaderBar.value) {
        return areaB.value
    }
    else {
        return areaA.value
    }
})
// 滚动监听
const handleScroll = () => {
    isFixHeaderBar.value = window.scrollY > 10
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    // 或者使用 document.body（取决于 CSS）
    // const { scrollTop, scrollHeight, clientHeight } = document.body

    if (scrollHeight - scrollTop - clientHeight <= 1) {
        // console.log('滚动到底部了！')
        //到达底部就触发一次加载更多卡片（如果可以）
        if (videoCardStore.unloadedCardsCount == 0) {
            videoCardStore.loadBottomCards()

        }
        else {
            //标识页面到达过底部
            videoCardStore.setIsReachBottom(true)
        }
    }
}

// 初始化动态组件
function InitDynamicVideoCard() {
    // 创建11个视频卡片
    videoCardStore.createVideoCards(11)
}
//监听卡片是否全部加载完成，如果完成且用户到达过底部，就触发一次加载更多卡片，否则就等用户到达页面底部时触发加载更多
watch(() => videoCardStore.unloadedCardsCount, (newValue) => {
    if (newValue == 0) {
        if (videoCardStore.isReachBottom) {
            videoCardStore.loadBottomCards()
        }
    }
}
)

function clickTag() {
    console.log('hello world');
}



// ====== 生命周期钩子 ======
onMounted(() => {
    // 如果需要初始化逻辑，放在这里
    // 例如：监听滚动、初始化第三方库等
    window.addEventListener('scroll', handleScroll, { passive: true })
    InitDynamicVideoCard()
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

// ====== 暴露给模板使用的变量/方法 ======
// 在 <script setup> 中，所有顶层声明的变量/函数**自动暴露给模板**
// 无需 return！
</script>

<style></style>