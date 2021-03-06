(function(window,$) {
	function basicUI(){

		function init(){
			console.log('Init BasicUI');
			$('.disabled button').prop('disabled', true);

			$('.popinLauncher').on('click', tpkPopin);
			$('.tab header >a').on('click', tpkTab);

		};

		function tpkPopin(e){
			e.preventDefault();
			var target = $(this).attr('tpk-popin');
			var content = $('#'+target).html();
			var popin;
			if($('#tpk-popin').length===0){
				popin = $('<div id="tpk-popin"><div class="popin-container"><a href="#" class="close fa fa-times"></a><div class="content"></div></div></div>');
				$('body').append(popin);
			} else {
				$('#tpk-popin').css('display', 'block');
			}

			$('#tpk-popin .content').html(content);

			
			$('#tpk-popin .close').on('click', function(e){
				e.preventDefault();
				$('#tpk-popin').css('display', 'none');
			});
		}

		function tpkTab(e){
			e.preventDefault();
			var target = $(this).attr('href').slice(1);
			$(this).parent().parent().find('.content >div').hide();
			$(".tab-"+target).show();
		}

		var that = {};
		that.init = init;
		return that;
	}

	window.triptyk = window.triptyk || {};
	window.triptyk.basicUI = basicUI().init;
})(window,jQuery);