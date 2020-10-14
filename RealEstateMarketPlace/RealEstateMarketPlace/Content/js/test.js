

var hotelsearch = [
    {
        Key: 1,
        Name: 'Hotel1',
        Amenities: [
            {
                Key: 1,
                Name: "AAA",
            },
            {
                Key: 2,
                Name: "BBB",
            }
        ]
    },
    {
        Key: 2,
        Name: 'Hotel2',
        Amenities: [
            {
                Key: 1,
                Name: "CCC",
            },
            {
                Key: 2,
                Name: "DDD",
            }
        ]
    },
    {
        Key: 3,
        Name: 'Hotel3',
        Amenities: [
            {
                Key: 1,
                Name: "Wifi",
            },
            {
                Key: 2,
                Name: "BBB",
            }
        ]
    },
    {
        Key: 4,
        Name: 'Hotel4',
        Amenities: [
            {
                Key: 1,
                Name: "DDD",
            },
            {
                Key: 2,
                Name: "Tour",
            }
        ]
    },
    {
        Key: 5,
        Name: 'Hotel5',
        Amenities: [
            {
                Key: 1,
                Name: "Wifi",
            },
            {
                Key: 2,
                Name: "Tour",
            }
        ]
    },
];

var filtersAmenities = ["Wifi", "Tour"];

var hotelResult = [];



$(document).ready(function () {
    $.each(hotelsearch, function (i) { /// loop mo ung hotels
        debugger;
        var Amlist = hotelsearch[i].Amenities;   // lipat mo ung amenities ng hotels na un
        $.each(filtersAmenities, function (j) {   // loop mo ung selected filters one by one
            debugger;
            var result = $.grep(Amlist, function (e) { return e.Name == filtersAmenities[j]; });

            if (result.length > 0) {
                var hotelexists = $.grep(hotelResult, function (e) { return e.Key == hotelsearch[i].Key; });  // check mmo if nageexists na ung hotel na ito sa result array

                if (hotelexists.length > 0) { // nageexist na or na iadd mo na before sa result array
                    alert('meron na skip add');
                }
                else {
                    hotelResult.push(hotelsearch[i]); // ipush mo sa result array
                }


            }
        });

    })
});






   
