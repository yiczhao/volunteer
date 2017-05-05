<template>
    <div class="KsSearch ks-col">
        <input type="text" class="input"
                v-model="keywords"
                :disabled="disabled"
                :placeholder="placeholder"
                :debounce="debounce"
                >
        <a class="icon SearchIcon" @click="getList($event)" v-if="!disabled">&#xe617;</a>
        <div class="SearchResult" v-show="resultShow">
            <ul>
                <template v-if="fuzzydata.length >= 1">
                    <template v-if="datalabel == 'name'">
                        <li v-for="item in fuzzydata" @click="selectItem($event)" :data-backCode="item.backCode"
                            :data-channelCode="item.channelCode" :data-key="item.key" :data-id="item.id">{{item.name}}
                        </li>
                    </template>
                    <template v-if="datalabel == 'label'">
                        <li v-for="item in fuzzydata" @click="selectItem($event)" :data-backCode="item.backCode"
                            :data-channelCode="item.channelCode" :data-key="item.key" :data-id="item.id">{{item.label}}
                        </li>
                    </template>
                    <template v-if="datalabel == 'channelName'">
                        <li v-for="item in fuzzydata" @click="selectItem($event)" :data-backCode="item.backCode"
                            :data-channelCode="item.channelCode" :data-key="item.key" :data-id="item.id">{{item.channelName}}
                        </li>
                    </template>
                </template>
                <template v-else>
                    <li @click="selectItem($event)">当前无搜索结果</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            disabled: {type: Boolean, default: false},
            placeholder: {type: String, default: '输入关键词搜索'},    
            resultattr: {type: String, default: 'key'}, 
            fuzzydata: {type: Array},
            datalabel: {type: String, default: 'label'},
            debounce: {type: Number, default: 500}
        },
        ready() {
            document.addEventListener('click', (e) => {
                if (this.$el && !this.$el.contains(e.target)) {
                    this.resultShow = false
                }
            }, false);
        },
        data() {
            return {
                resultShow: false,
                keywords: ''
            }
        },
        methods: {
            getList () {

                this.resultShow = true
                
                this.$emit('actionsearch', this.keywords)
            },
            selectItem (event) {

                this.resultShow = false

                var e = window.event || event
                let temp = e.target ? e.target : e.srcElement
                if (temp.innerText == '当前无搜索结果') return
                this.keywords = temp.innerText

                this.$emit('actionselect', temp.getAttribute('data-' + this.resultattr), temp.innerText)
            },
        },
        watch: {
            keywords () {
                this.getList()
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/Search"
</style>