<template>
	<view>
		4444444444444444
		<!-- //注意语法的使用 参考VUE2   例如  空格：的写法 : 代表属性的动态的绑定-->
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="(item, i) in swiperList" :key="i">
			<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id">
				<image :src="item.image_src"></image>
			</navigator>
		</swiper-item>
	</swiper>
	<!-- 分类导航区 -->
	<view class="nav-list">
	   <view class="nav-item" v-for="(item, i) in navList" :key="i">
	     <image :src="item.image_src" class="nav-img"></image>
	   </view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//这是轮播图的数据列表
				swiperList : [],
				//数据节点 分类 导航
				//哈哈哈哈哈哈哈哈哈哈哈哈
				navList : []
			};
		},
		onLoad() {
			//获取数据
			this.getSwiperList()
			this.getNavlist()
		},
		methods : {
			async getSwiperList(){
				const {data: res}=	await
				 
				 
				 
				 
			uni.$http.get('/api/public/v1/home/swiperdata')
				//请求失败
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			
			},
			async getNavlist(){
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList= res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
		}
		.nav-list {
		  display: flex;
		  justify-content: space-around;
		  margin: 15px 0;
		
		  .nav-img {
		    width: 128rpx;
		    height: 140rpx;
		  }
		}
</style>
