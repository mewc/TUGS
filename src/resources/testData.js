export const testData = {
    schools: [
        {
            id: 1,
            name: "Monash University",
            faculties: [
                {
                    id: 1000,
                    name: "Information Technology",
                    subjects:
                        [
                            {
                                id: 1,
                                code: 'FIT1031',
                                title: 'Computers & Networks',
                                votesUp: 3,
                                votesDown: 0,
                                intensity: {
                                    avg: 0.3,
                                    votes: 1342,
                                },
                                rewarding: {
                                    avg: 3.8,
                                    votes: 22,
                                },
                                tips: []
                            },
                            {
                                id: 2,
                                code: 'FIT1040',
                                title: 'Programming Fundamentals',
                                votesUp: 1,
                                votesDown: 5,
                                intensity: {
                                    avg: 0.1,
                                    votes: 754,
                                },
                                rewarding: {
                                    avg: 0.2,
                                    votes: 53,
                                },
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
                                intensity: {
                                    avg: 0.9,
                                    votes: 264,
                                },
                                rewarding: {
                                    avg: 4.1,
                                    votes: 64,
                                },
                                tips: [
                                    "One of the harder, but very much the most rewarding subjects. Very practical",
                                ]
                            }
                        ]
                }
            ]
        },
        {
            id: 2,
            name: "RMIT",
            faculties: [
                {
                    id: 2000,
                    name: "Computer Science",
                    subjects:
                        [],
                }
            ]
        }
    ],
    users: [
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
            ],
            starred: [
                1,2
            ],
            settings: {
                admin: true,
                uniId: 1,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            }
        },
        {
            id: 10000002,
            name: "Ramzi",
            votesUp: [],
            votesDn: [
                1, 2, 3
            ],
            rating: [],
            starred: [
                1
            ],
            tips: [2],
            settings: {
                admin: false,
                uniId: 1,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            }
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
            ],
            starred: [

            ],
            tips: [2, 3],
            settings: {
                admin: false,
                uniId: 1,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            }
        }
    ]

}
