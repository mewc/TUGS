export const testData = {
    faculty: "Information Technology",
    subjects:
        [
            {
                id: 1,
                code: 'FIT1031',
                title: 'Computers & Networks',
                votesUp: 3,
                votesDown: 0,
                avgIntensityRating: 0.5,
                avgRewardingRating: 3.6,
                tips: []
            },
            {
                id: 2,
                code: 'FIT1040',
                title: 'Programming Fundamentals',
                votesUp: 1,
                votesDown: 5,
                avgIntensityRating: 0.2,
                avgRewardingRating: 1.2,
                tips: [
                    "You can do this in your sleep, do your other harder subjects alongside this",
                    "6 year olds do this"
                ]
            },
            {
                id: 3,
                code: 'FIT3047',
                title: 'Mobile Development',
                votesUp: 55,
                votesDown: 55,
                avgIntensityRating: 0.8,
                avgRewardingRating: 4.5,
                tips: [
                    "One of the harder, but rewarding subjects. Very practical",
                ]
            }
        ],
    users:
        [
            {
                id: 10000001,
                name: "Michael",
                votesUp: [
                    1, 3
                ],
                votesDn: [],
                rating: [
                    {
                        id: 3,
                        value: 1
                    },
                    {
                        id: 2,
                        value: 4
                    },
                    {
                        id: 1,
                        value: 3
                    }
                ]
            },
            {
                id: 10000002,
                name: "Ramzi",
                votesUp: [],
                votesDn: [
                    1, 2, 3
                ], rating: []
            },
            {
                id: 10000003,
                name: "Jenkins",
                votesUp: [
                    2
                ],
                votesDn: [
                    1
                ],
                rating: [
                    {
                        id: 1,
                        value: 1
                    },
                    {
                        id: 2,
                        value: 5
                    }
                ]
            }
        ]

}