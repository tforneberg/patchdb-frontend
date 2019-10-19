<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { News } from '@/model/Model';

@Component({
	components: {
		
	},
})
export default class NewsDetailsView extends Mixins(Constants) {
    @Prop() private id: string;

	private news : News = new News();

	private loadNextButtonVisible:boolean = true;

	created() {
		this.loadNews();
	}

	private loadNews() : void {
		this.axios.get('api/news/'+this.id)
		.then(response => {
			this.news = response.data as News;
		})
		.catch(error => console.log(error)); //TODO error message
	}
}
</script>

<template>
	<b-card id="newsCard" >
    <vue-headful :title="TITLE_PREFIX+'News: ' + news.title ? news.title : ''"/>
    <div v-if="news">
        <h1>{{news.title}}</h1>
        <div>
            <p>Submitted<span v-if="news.creator"> by <router-link :to="'/user/'+news.creator.id">{{news.creator.name}}</router-link></span> on {{news.created}}</p>
            <p>{{news.content}}</p>
        </div>
    </div>
</b-card>
</template>