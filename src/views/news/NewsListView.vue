<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { News } from '@/model/Model';
import NewsComponent from '@/components/NewsComponent.vue';

@Component({
	components: {
		NewsComponent
	},
})
export default class NewsListView extends Mixins(Constants) {
	private newsList:News[] = [];
	private currentPage:number = 0;
	private size:number = 12;

	private loadNextButtonVisible:boolean = true;

	created() {
		this.loadNews();
	}

	private loadNews() : void {
		this.axios.get('/api/news?page='+this.currentPage+'&size='+this.size)
		.then(response => {
			var newNews = response.data;
			this.newsList.push(...newNews);
			this.currentPage++;
			if (newNews.length < this.size) {
				this.loadNextButtonVisible = false;
			}
		})
		.catch(err => { //TODO error message?
		}); 
	}
}
</script>

<template>
	<div class="text-center">
		<vue-headful :title="TITLE_PREFIX+'News'"/>
		<h1>News</h1>
		<div>
			<div class="row">
				<div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="news in newsList" v-bind:key="news.id">
					<NewsComponent class="mx-3 my-3" v-bind:news="news"/>
				</div>
			</div>
			<div class="text-center">
				<button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadNews()" type="submit" class="btn btn-primary">Load next News</button>
			</div>
		</div>
	</div>
</template>