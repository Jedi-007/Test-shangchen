<template>
	<view>
		564546454654651616516515161616156
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
	   <view class="nav-item" v-for="(item, i) in navList" :key="i"
	   @click="navClickhandler(item)">
	     <image :src="item.image_src" class="nav-img"></image>
	   </view>
	</view>
	<!-- 楼层区域 -->
	<view class="floor-list">
		<view class="floor-item" v-for="(item,i) in floorList" :key="i">
			<image :src="item.floor_title.image_src" class="floor-title">
				
			</image>
			<!-- louceng de tupian quyu -->
			<view class="floor-img-box">
				<!-- 左侧的大图 -->
				<navigator class="left-img-box" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src"
					 :style="{width: item.product_list[0].image_width + 'rpx'}"
					  mode="widthFix"></image>
				</navigator>
				<!-- right pic -->
				
				<view class="right-img-box">
					<navigator class="right-img-item" v-for="(item2,i2) in item.product_list"
					:key="i2" v-if="i2 !== 0" :url="item2.url">
						<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}"
						mode="widthFix">
						</image>
					</navigator>
				</view>
			</view>
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
				navList : [],
				//楼层的数据
				floorList: []
			};
		},
		onLoad() {
			//获取数据
			this.getSwiperList()
			this.getNavlist()
			this.getfloorList()
		},
		methods : {
			async getSwiperList(){
				const {data: res}=	await uni.$http.get('/api/public/v1/home/swiperdata')
				//请求失败
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			
			},
			async getNavlist(){
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList= res.message
			},
			navClickhandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
				
			},
			//获取首页的楼层的数据
			async getfloorList(){
			const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
			if(res.meta.status !== 200) return uni.$showMsg()
			res.message.forEach(floor =>{
				floor.product_list.forEach(prod =>{
					prod.url = '/subpkg/goods_list/goods_list?' +
					prod.navigator_url.split('?')[1]
				})
			})
			this.floorList = res.message
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
		.floor-title{
			height: 60rpx;
			width: 100%;
		}
		.right-img-item{
			
		}
		.right-img-box{
			display: flex;
			flex-wrap: wrap; 
			justify-content: space-around;
		}
		.floor-img-box{
			display: flex;
			padding-left: 10rpx;
		}
</style>
