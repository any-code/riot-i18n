<translate>
    <span ref="translated" name="translated"></span>
    <span ref="original" name="original" class="original"><yield /></span>
    <style scoped>
        :scope {
            display: inline-block;
        }
        .original {
            display: none;
        }
    </style>
    <script>
        this.mixin('translate');

        this.translate.on('update', function() {
            this.update();
        }.bind(this));

		this.on('mount', function() {
			this.hasRefs = this.refs != undefined;
			this.apply();
		})

        this.on('update', function() {
			this.apply();
		})

		this.apply = function() {
			var refs = this.hasRefs ? this.refs : this;
			refs.applyd.innerHTML = this.translate.apply(refs.original.innerHTML);
		}
    </script>
</translate>
