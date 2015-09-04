$(function() {

$(".header").velocity(
	{ 
		translateY: [ 0, 50 ], 
		scale: [ 1, 0.1 ] 
	},
	{
 		duration: 800,
 		delay: 1250,
 		easing: "spring",
		complete: function() { 
			$(".phrase").velocity(
			{ 
				translateY: [ 0, 50 ],
				scale: [ 1, 0.1 ]
			},
			{ 
				duration: 800,
				easing: "spring" 
			}); 
		}
	});
	


});