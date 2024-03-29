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
                                id: 110001,
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
                                id: 110002,
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
                                id: 110003,
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
            saved: [
                1,2
            ],
            tipped: [
                
            ],
            settings: {
                admin: true,
                uniId: 1,
                facultyId: 1000,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            },
            meta: {
                ips: ["192.169.0.1", "192.169.0.2"]
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
            saved: [
                1
            ],
            tips: [2],
            settings: {
                admin: false,
                uniId: 1,
                facultyId: 1000,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            },
            meta: {
                ips: ["192.169.0.4", "192.169.0.5"]
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
            saved: [

            ],
            tips: [2, 3],
            settings: {
                admin: false,
                uniId: 1,
                facultyId: 1000,
                style: {
                    backgroundColor: "#e7e7e7"
                }
            },
            meta: {
                ips: ["192.169.0.1", "192.169.0.3"]
            }
        }
    ],
    pendingTips: [
        {
            subjectId: 1,
            text: "This is a pending tip",
            ip: "192.169.0.1",
            user: 10000001,
        }
    ]
}
