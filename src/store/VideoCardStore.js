import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { v4 as uuidv4 } from 'uuid'
import { ref, watch } from 'vue'
import { getRecommendedVideoInfo, getUserVideoInfoPage, getUserVideoNum } from '@/api/video'
import { useRoute } from 'vue-router'
const route = useRoute()
export const useVideoCardStore = defineStore('videoCard', {

    state: () => ({
        //动态视频卡片
        DynamicVideoCard: [],
        // 未加载的卡片数量，如果为0就代表允许加载更多卡片，否则就不允许
        unloadedCardsCount: 0,
        //是否到达过底部
        isReachBottom: false,
        //暂存的推荐视频信息，等待被需要的卡片使用
        tempRecommendedVideoInfo: [],
        //是否已经发送请求获取推荐视频信息，如果没发送请求说明有数据可以被获取，如果在发送请求说明没数据应该等待
        isPreloadNotReady: false,
        //当前查看的用户主页的用户id
        profileUserId: 0,
        //总视频数
        totalCount: 0

    }),
    actions: {
        //获取用户投稿视频数量
        async userVideoNum() {
            if (!this.profileUserId) { // 等价于：null / 0 / undefined 都判断
                console.error("[错误] 请先设置当前查看的用户主页的用户id，profileUserId 为空");

                // 从路由获取 uid（必须先获取 route）
                const route = useRoute(); // 如果你是 vue3 + setup 模式，必须加这行
                const uid = route.params.uid;

                // 如果路由也没有 uid，直接退出，防止报错
                if (!uid) {
                    console.error("[错误] 路由上没有 uid 参数");
                    return;
                }

                // 设置用户ID
                this.setProfileUserId(uid);

                // 再次校验（防止设置失败）
                if (!this.profileUserId) {
                    return;
                }
            }
            const res = await getUserVideoNum({
                userId: parseInt(this.profileUserId)
            })
            if (res.code === 200) {
                this.profileUserId = res.data
            }
            else {
                console.error("[错误] 获取用户视频数量失败", res.message);
            }
        },
        //更具分页获取当前主页用户投稿的视频
        async userVideoInfo(pageNum, pageSize, videoList) {
            videoList.value = []
            if (!this.profileUserId) { // 等价于：null / 0 / undefined 都判断
                console.error("[错误] 请先设置当前查看的用户主页的用户id，profileUserId 为空");

                // 从路由获取 uid（必须先获取 route）
                const route = useRoute(); // 如果你是 vue3 + setup 模式，必须加这行
                const uid = route.params.uid;

                // 如果路由也没有 uid，直接退出，防止报错
                if (!uid) {
                    console.error("[错误] 路由上没有 uid 参数");
                    return;
                }

                // 设置用户ID
                this.setProfileUserId(uid);

                // 再次校验（防止设置失败）
                if (!this.profileUserId) {
                    return;
                }
            }
            const res = await getUserVideoInfoPage(
                {
                    userId: parseInt(this.profileUserId),
                    pageNum: parseInt(pageNum),
                    pageSize: pageSize == -1 ? parseInt(process.env.VUE_APP_USER_VIDEO_PAGE_SIZE) : parseInt(pageSize)
                }
            )
            if (res.code === 200) {
                videoList.value = res.data
            }
            console.log("[视频卡片] 获取用户视频成功", res.data);
        },
        setProfileUserId(id) {
            this.profileUserId = id
            console.log("[视频卡片] 设置当前查看的用户主页的用户id", id);
            this.userVideoNum()
        }
        ,
        //创建指定数量的视频卡片
        createVideoCards(count) {
            this.unloadedCardsCount += count
            for (let i = 0; i < count; i++) {
                this.DynamicVideoCard.push({
                    // 唯一标识符（仅用于该网页）
                    id: uuidv4(),
                    //是否完成资源获取
                    isLoaded: false,
                    // 可以添加其他 props，如 title、src 等
                })
            }
        },
        //卡片加载完成
        videoCardLoaded(id) {
            this.unloadedCardsCount--
            this.DynamicVideoCard.forEach(item => {
                if (item.id === id) {
                    item.isLoaded = true
                }
            })
        },
        //页面到达过底部
        setIsReachBottom(value) {
            this.isReachBottom = value
        },
        //加载一次底部卡片
        loadBottomCards() {
            this.setIsReachBottom(false)
            this.createVideoCards(10)
        },
        // 卡片数据分发器：不按 id 匹配，而是从预加载池中分配一个可用卡片
        getCardInfo() {
            if (this.tempRecommendedVideoInfo.length > 0) {
                const card = this.tempRecommendedVideoInfo.shift(); // 分配一个预加载卡片
                if (card) {
                    console.log(`[分配] 卡片 ${card.id}`);
                }
                else {
                    // 没有预加载数据，记录该组件在等待
                    if (!this.isRequested) {
                        // 发送请求获取预加载数据
                        this.isPreloadNotReady = true;
                        console.log("[请求] 获取预加载数据");
                        this.getPreloadData()
                    }
                    return null;

                }
                return card;
            } else {
                // 没有预加载数据，记录该组件在等待
                if (!this.isRequested) {
                    // 发送请求获取预加载数据
                    this.isPreloadNotReady = true;
                    console.log("[请求] 获取预加载数据");
                    this.getPreloadData()
                }
                return null;
            }
        },

        //获取预加载数据
        // store.js
        async getPreloadData(maxRetries = 3, currentRetry = 0) {
            // 防重入：如果已准备好，直接退出
            if (!this.isPreloadNotReady) return;

            // 超过最大重试次数，放弃
            if (currentRetry >= maxRetries) {
                console.warn("[预加载] 已达到最大重试次数，停止重试");
                return;
            }

            try {
                const res = await getRecommendedVideoInfo({ num: 10 });
                console.log("[预加载] 获取预加载数据成功", res);
                const data = res.data || [];
                if (data.length > 0) {
                    this.tempRecommendedVideoInfo = data;
                    this.isPreloadNotReady = false; // ✅ 成功，标记就绪
                    return;
                }
                // 如果返回空数据，视为失败
            } catch (err) {
                console.log(`[预加载] 第 ${currentRetry + 1} 次失败`, err);
            }

            // 延迟后重试（带退避：越往后等越久）
            const delay = 1000 + currentRetry * 500; // 1s, 1.5s, 2s, ...
            setTimeout(() => {
                this.getPreloadData(maxRetries, currentRetry + 1);
            }, delay);
        }

    },
    getters: {
    }
})