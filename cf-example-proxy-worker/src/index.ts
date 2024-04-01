import {setBlackCrowCookie} from '@bcai/edge-sdk'

interface Env {
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext) {
        return setBlackCrowCookie(request);
    },
};
