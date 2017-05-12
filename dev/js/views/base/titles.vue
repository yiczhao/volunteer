<template>
    <div v-show="!!title" class="page-title">{{title}}</div>
</template>
<script>
    export default{
        vuex: {
            getters: {
                title ({ titles }) {
                    return titles.titles
                }
            }
        }
    }
</script>
