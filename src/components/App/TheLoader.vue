<template>
    <div class="app-loader">
        <div class="preloader-wrapper active">
            <div class="spinner-layer"
                :class="preloaderColor"
            >
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TheLoader',
  computed: {
    preloaderColor () {
      const color = ['spinner-red-only', 'spinner-green-only', 'spinner-blue-only']
      return color[Math.floor(Math.random() * 3)]
    }
  }

}
</script>
