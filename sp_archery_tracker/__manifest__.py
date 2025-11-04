{
    "name": "Archery Tracker",
    "version": "1.0",
    "depends": ["base_setup"],
    "installable": True,
    "application": True,
    "data": [
        "security/sp_archery_tracker_security.xml",
        "security/ir.model.access.csv",
        "views/sp_archery_tracker_views.xml",
        "views/sp_archery_tracker_menus.xml",
    ],
    "assets": {
        "sp_archery_tracker.assets_archery_tracker": [
            ("include", "web._assets_helpers"),
            "web/static/src/scss/pre_variables.scss",
            "web/static/lib/bootstrap/scss/_variables.scss",
            ("include", "web._assets_bootstrap"),
            ("include", "web._assets_core"),
            "sp_archery_tracker/static/src/archery_tracker/**/*",
        ],
        "web.assets_backend": [
            "sp_archery_tracker/static/src/ends/**/*"
        ]
    }
}
