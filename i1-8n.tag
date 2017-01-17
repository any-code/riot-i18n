<i1-8n>

    <style scoped>
        :scope {
            display: inline-block;
        }
        .original {
            display: none;
        }
    </style>

    <span ref="localised" name="localised"></span>
    <span ref="original" name="original" class="original"><yield /></span>

    <script>
        this.mixin('i18n')

        this.i18n.on('update', function() {
            this.update()
        }.bind(this))

		this.on('mount', function() {
			// Did riot use V3 refs?
			this.hasRefs = this.refs != undefined

			this.localise()
		})

        this.on('update', function() {
			this.localise()
		})
		
		this.localise = function() {
			var refs = this.hasRefs ? this.refs : this;
			refs.localised.innerHTML = this.i18n.localise(refs.original.innerHTML);
		}

    </script>

</i1-8n>
