rule think_php_rce {

    meta:
        data_source = "file download"
        description = "Attempts to exploit RCE relating to ThinkPHP."
        reference = "https://securitynews.sonicwall.com/xmlpost/thinkphp-remote-code-execution-rce-bug-is-actively-being-exploited/, https://www.tenable.com/blog/thinkphp-remote-code-execution-vulnerability-used-to-deploy-variety-of-malware-cve-2018-20062"
        author = "ssafuze"

    strings:
        $s1 = "invokefunction&function=call_user_func_array&vars[0]=shell_exec&vars[1][]" // exact naming before this string has been seen to vary to left out

    condition:
        $s1
}