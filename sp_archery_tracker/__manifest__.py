{
    "name": "Archery Tracker",
    "version": "1.0",
    "depends": ["base"],
    "installable": True,
    "application": True,
    "data": [
        "views/sp_archery_tracker_views.xml"
    ],
    "assets": {
        "sp_archery_tracker.assets_archery_tracker": [
            ("include", "web._assets_helpers"),
            "web/static/src/scss/pre_variables.scss",
            "web/static/lib/bootstrap/scss/_variables.scss",
            ("include", "web._assets_bootstrap"),
            ("include", "web._assets_core"),
            "sp_archery_tracker/static/src/archery_tracker/**/*",
        ]
    }
}
