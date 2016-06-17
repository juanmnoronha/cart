(function() {

	function init() {
		getProducts();
	}

	function getProducts() {
		$.getJSON('https://dl.dropboxusercontent.com/u/9490401/products.json', function (data) {
	        $.each(data.products, function (i, product) {
	        	var id = product.id,
	        		picture = "img/picture-" + [i] + ".jpg",
	        		name = product.title;
	        		description = product.style ? product.style : '',
	        		currency = product.currencyFormat;
	        		price = parseFloat(product.price.toFixed(2)),
	        		customPrice =  product.price.toFixed(2).split('.'),
	        		installments = product.installments,
	        		sizes = product.availableSizes,
	        		productItem = ('<div class="col-xs-12 col-sm-4">' + '<div class="product-item">' + '<a class="product-item__link" href="#" data-id="' + id + '" data-description="' + description + '" data-currency="' + currency + '" data-price="' + price + '" data-installments="' + installments + '" data-sizes="' + sizes + '">' + '<img class="product-item__picture" src="' + picture + '" alt="">' + '<p class="product-item__name">' + name + '</p>' + '<div class="product-item__price">' + '<span class="currency">' + currency + ' ' + '</span>' + '<span class="value">' + '<span class="value__integer">' + customPrice[0] + '</span>' + ',' + customPrice[1] + '</span>' + '</div>' + '</a>' + '</div>' + '</div>');

	            	$('.products .row').append(productItem);
	            });
	    });
	    addCart();
	}

	function addCart() {
		$(document).on('click', '.product-item__link', function(e) {
			e.preventDefault();

			var productItem = $(".cart-items__item").length,
				productId = $(this).data("id");
				productImg = $(this).find(".product-item__picture").attr('src'),
				productName = $(this).find(".product-item__name").text(),
				productDescription = $(this).data("description"),
				productSize = $(this).data("size"),
				productCurrency = $(this).data("currency"),
				productPrice = $(this).data("price"),
				productInstallments = $(this).data("installments"),
				customPrice =  productPrice.toFixed(2).split('.'),
				formatPrice = parseFloat(productPrice).toFixed(2).replace('.', ','),
				cartItem = $('<div class="cart-items__item" data-id="'+ productId +'" data-price="' + productPrice + '">' + '<div class="product-line">' + '<a class="product-line--remove js-remove" href="#">' + '<span class="product-line__icon-remove">Remover</span>' + '</a>' + '<div class="product-line--thumb">' + '<img src="' + productImg + '" alt="">' + '</div>' + '<div class="product-line--info">' + '<span class="name">' + productName + '</span>' + '<span class="info">' + '<span class="info__size">' + productSize + '</span>' + '<span class="info__divide"> | </span>' + '<span class="info__color">' + productDescription + '</span>' + '</span>' + '<span class="quantity">Quantidade: <span class="quantity__value">0</span></span>' + '</div>' + '<div class="product-line--price">' + productCurrency + ' ' + formatPrice + '</div>' + '</div>' + '</div>');

				$(".cart-items").append(cartItem);

			updateTotal();
			totalItems();
			removeCart();
		});
	}

	function updateTotal() {
		var subTotal = 0;

	    $(".cart-items__item").each(function() {
	        var price = $(this).data("price");
	        var currency = $(this).data("currency");
	        var installments = $(this).data("installments");

	        subTotal += price;
	    });

	    var divideInstallments = subTotal / installments;

	    $(".cart-subtotal__price .value").html(currency + " " + subTotal.toFixed(2).replace('.', ','));
	    $(".cart-subtotal__price .installments").html("Ou em até " + installments + " x " + " de " + currency + " " + divideInstallments.toFixed(2).replace('.', ','));
	}

	function removeCart() {
		$(".js-remove").on({
			"mouseover" : function() {
				$(this).parents(".cart-items__item").addClass("line-through");
			},

			"mouseout" : function() {
				$(this).parents(".cart-items__item").removeClass("line-through");
			},

			"click" : function() {
				$(this).parents(".cart-items__item").remove();
				updateTotal();
				totalItems();
			}
		});
	}

	function totalItems() {
		var totalItems = $('.cart-items__item').length;
		
		$('.bag__total-items').text(totalItems);

		if(totalItems) {
			$(".cart").addClass('js-slide');
		} else {
			$(".cart").removeClass('js-slide');
		}
	}

	init();

}());