export type ApiTicketack_screening = {
    "_id": string,
    "title": {
        "fr": string,
        "original": string
    },
    "description": {
        fr: string
    },
    "start_at": string,             //"2024-08-28T15:20:00.000Z"
    "stop_at": string,              //"2024-08-28T16:50:00.000Z"
    "ignore_overlap_rules": false,
    "buckets":         {
        "_id": string,
        "total_capacity": number,
        "may_steal_from": ("default")[],
        "rules": {
            "not_after": string,
            "only_for_roles"?: ("on-site"|"admin"|"eshop"|"entry_check"|"overbooker")[]
        },
        "available": number,
        "confirmed": number,
        "unconfirmed": number,
        "scanned": number,
        "_in": number,
    }[],
    "pricings": {
        "fullprice"?: {
            "name": {
                "fr": string
            },
            "description": {},
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": number
                "additional_class_names"?: string
            },
            "rules": {}
        },
        "reduced"?: {
            "name": {
                "fr": string
            },
            "description": {
                "fr": string
            },
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": 2
            },
            "rules": {}
        },
        "support"?: {
            "name": {
                "fr": string
            },
            "description": {
                "fr": string
            },
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": number
                "additional_class_names"?: string
            },
            "rules": {}
        },
        "free"?: {
            "name": {
                "fr": string //"Offert" | "Invitation"
            },
            "description": {},
            "price": {
                "CHF": 0
            },
            "value": {
                "CHF": 0
            },
            "wallet_amount": {
                "CHF": 0
            },
            "value_per_screening": {
                "CHF": 0
            },
            "VAT": 0,
            "category": "default",
            "sellers": [
                "on-site",
                "admin"
            ],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": number
                "additional_class_names"?: string
            },
            "rules": {}
        },
        "youth"?: {
            "name": {"fr": "-12 ans"},
            "description": {},
            "price": {"CHF": 10},
            "value": {"CHF": 10},
            "wallet_amount": {"CHF": 0},
            "value_per_screening": {"CHF": 0},
            "VAT": 0,
            "category": "default",
            "sellers": ["eshop", "on-site", "admin"],
            "refs": [],
            "opaque": {"eshop_sort_weight": 5, "additional_class_names": "red"},
            "rules": {}
        },
        "reduced_avsai"?: {
            "name": {"fr": "Réduit AVS/AI"},
            "description": {"fr": "<p>Au chômage ou à l'Assurance Invalidité</p>"},
            "price": {"CHF": 12},
            "value": {"CHF": 12},
            "wallet_amount": {"CHF": 0},
            "value_per_screening": {"CHF": 0},
            "VAT": 0,
            "category": "default",
            "sellers": ["eshop", "on-site", "admin"],
            "refs": [],
            "opaque": {"eshop_sort_weight": 1, "additional_class_names": "green"},
            "rules": {}
        },
        "reduced_formation"?: {
            "name": {"fr": "Réduit En formation"},
            "description": {"fr": "<p>En formation, étudiantexs</p>"},
            "price": {"CHF": 12},
            "value": {"CHF": 12},
            "wallet_amount": {"CHF": 0},
            "value_per_screening": {"CHF": 0},
            "VAT": 0,
            "category": "default",
            "sellers": ["eshop", "on-site", "admin"],
            "refs": [],
            "opaque": {"eshop_sort_weight": 2, "additional_class_names": "green"},
            "rules": {}
        },
        "reduced_caritas"?: {
            "name": {"fr": "Réduit carte culture"},
            "description": {"fr": "<p>Carte culture Caritas (Office subsides assurances maladie)</p>"},
            "price": {"CHF": 12},
            "value": {"CHF": 12},
            "wallet_amount": {"CHF": 0},
            "value_per_screening": {"CHF": 0},
            "VAT": 0,
            "category": "default",
            "sellers": ["eshop", "on-site", "admin"],
            "refs": [],
            "opaque": {"eshop_sort_weight": 3, "additional_class_names": "green"},
            "rules": {}
        }
    },
    "cinema_hall": {
        "_id": string,
        "created_at": string,
        "updated_at": string,
        "number": string,
        "name": string,
        "cinema": string,
        "address": string,
        "zip": string,
        "city": string,
        "state": string,
        "country": string,
        "refs": [],
        "opaque": {
            "capacity": string
        }
    },
    "films": [
        {
            "_id": string,
            "title": {
                "fr": string,
                "original": string
            },
            "sections": {
                name: { fr: 'événement' | string }
                _id: "47958d1d-272f-4106-8dd5-eff93f45d8f0" | string
            }[],
            "opaque": {
                "type": "movie" | "poster" | "banner",
                "service_type": null,
                "description": {
                    "fr": string
                },
                "suisa": string,
                "year": number,
                "distributor": {
                    "id": string,
                    "created_at": string,
                    "updated_at": string,
                    "created_by": null | string,
                    "updated_by": null | string,
                    "name": string,
                    "address": string,
                    "zip": string,
                    "city": string,
                    "country": string,
                    "maccsbox_id": string,
                    "contact_mail": "",
                    "report_mail": ""
                },
                "l_min_age": string,
                "s_min_age": string,
                "a_min_age": string,
                "free_text_1": {
                    "fr": string
                },
                "free_text_2": {
                    "fr": string
                },
                "free_text_3": {
                    "fr": string
                },
                "free_text_4": [],
                "free_text_5": [],
                "free_text_6": [],
                "posters": {
                    "url": string
                    "type": "movie" | "poster" | "banner"
                }[],
                "trailers": [
                    {
                        "url": string,
                        "image": string
                    }
                ],
                "genre": string,
                "sections": {
                    name: { fr: 'événement' | string }
                    _id: "47958d1d-272f-4106-8dd5-eff93f45d8f0" | string
                }[],
                "people": [
                    {
                        "activity": string,
                        "firstname": string,
                        "lastname": string
                    },
                    {
                        "activity": string,
                        "firstname": string,
                        "lastname": string
                    },
                    {
                        "activity": string,
                        "firstname": string,
                        "lastname": string
                    }
                ],
                "duration": number,
                "countries": [
                    string
                ],
                "languages": {
                    "original": [
                        string
                    ],
                    "audio": [
                        string
                    ],
                    "subtitles": []
                }
            }
        }
    ],
    "sections": {
                name: {fr: 'événement' | string}
                _id: "47958d1d-272f-4106-8dd5-eff93f45d8f0" | string
            }[],
    "refs": [
        {
            "id": string
        }
    ],
    "opaque": {
        "posters": {
                "url": string
            }[],
        "week": number,
        "break": boolean,
        "format": string,
        "version": string,
        "_3d": boolean,
        "ignore_on_maccsbox": boolean
    }
}
