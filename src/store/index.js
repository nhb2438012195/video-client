// 自动导入所有 store（推荐方式）
import { useUserStore } from './UserStore'
import {useVideoCardStore} from './VideoCardStore'
import { usePublicStore } from './PublicStore'
import { useVideoStore } from './VideoStore'
import { useMessageStore } from './MessageStore'

// 如果有更多，继续 import...

// 统一导出
export { useUserStore, useVideoCardStore,usePublicStore,useVideoStore,useMessageStore}
