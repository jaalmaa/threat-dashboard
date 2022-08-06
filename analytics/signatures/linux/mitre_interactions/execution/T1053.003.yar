rule T1053_003_cron_cowrie {

    meta:
        data_source = "Cowrie"
        technique_name = "TT1053_003 Scheduled Task/Job: Cron"
        description = "Looks for usage of cron/crontab"
        author = "ssafuze"

    strings:
        $source = "cowrie"
        $1 = "cron"

    condition:
        $source and $1
}