# Security Policy

Geyser takes the security of its users, projects, accounts, and payment infrastructure seriously. We appreciate the work of security researchers who responsibly investigate and report potential vulnerabilities.

Please do not report security vulnerabilities through public GitHub issues, discussions, social media, or other public channels.

## Supported Versions

Geyser is a hosted web application that is deployed continuously rather than distributed as independently supported software releases.

Security fixes are applied to:

* The current production deployment at `https://geyser.fund`
* The current staging deployment at `https://staging.geyser.fund`
* The current codebase of this repository

Historical commits, branches, and locally modified deployments are generally not supported unless the vulnerability also affects a current Geyser deployment.

## Reporting a Vulnerability

Email security reports privately to:

**[support@geyser.fund](mailto:support@geyser.fund)**

Use a subject such as:

```text
SECURITY: Brief description of the vulnerability
```

Please include as much of the following information as possible:

* A clear description of the vulnerability
* The affected URL, feature, component, or commit
* The security impact and who may be affected
* Detailed reproduction steps
* Any prerequisites or required account state
* A minimal proof of concept
* Relevant screenshots, request and response samples, or logs
* Suggested mitigations or fixes, when available
* Your preferred name or handle for acknowledgement

Do not include authentication tokens, private keys, passwords, personal data, or other unnecessary sensitive information in the initial email. We will arrange an appropriate secure channel when additional sensitive material is required.

## Response Process

We aim to:

* Acknowledge receipt within three business days
* Provide an initial assessment within seven business days
* Keep the reporter informed of meaningful progress
* Coordinate remediation and disclosure when appropriate

Resolution time will depend on the vulnerability’s severity, complexity, affected systems, and required coordination with third parties.

Please allow us a reasonable opportunity to investigate and remediate the issue before publishing information about it.

## Research Guidelines

When investigating Geyser, you must:

* Use accounts and projects that you own or have explicit permission to test
* Prefer the staging environment where practical
* Use the minimum access and interaction necessary to demonstrate the issue
* Avoid accessing, modifying, deleting, or downloading another user’s data
* Avoid initiating, redirecting, intercepting, or interfering with payments
* Avoid obtaining or using another person’s credentials, session, private keys, or wallet information
* Stop testing and report the issue immediately if you encounter sensitive data or gain the ability to affect user funds
* Make a good-faith effort to avoid service disruption, privacy violations, and financial harm
* Comply with applicable laws

When testing payment-related functionality, use only wallets and funds that you control. Keep transaction values to the minimum reasonably necessary to demonstrate the vulnerability.

## Prohibited Testing

The following activities are not permitted:

* Denial-of-service or resource-exhaustion attacks
* High-volume automated scanning that may affect service availability
* Social engineering, phishing, or impersonation
* Testing against Geyser users, creators, employees, contractors, or partners without their explicit permission
* Physical attacks against offices, infrastructure, or personnel
* Introducing malware or persistent access mechanisms
* Destructive testing or deletion of data
* Moving, withholding, or attempting to steal funds
* Accessing more data than is necessary to demonstrate the vulnerability
* Public disclosure before Geyser has had a reasonable opportunity to respond

## In-Scope Findings

Examples of vulnerabilities that are generally in scope include:

* Authentication or authorization bypasses
* Account takeover
* Access to another user’s private information
* Ability to create, modify, or delete projects without authorization
* Vulnerabilities that could redirect, manipulate, or interfere with payments
* Exposure of credentials, signing material, private keys, or sensitive configuration
* Remote code execution
* SQL injection or other server-side injection
* Stored or reflected cross-site scripting with meaningful impact
* Server-side request forgery
* Cross-site request forgery affecting sensitive actions
* Privilege escalation
* Significant business-logic vulnerabilities
* Security vulnerabilities in Geyser-controlled integrations or infrastructure

A vulnerability in a third-party dependency may be reported when it is demonstrably exploitable through Geyser.

## Generally Out-of-Scope Findings

The following are generally not considered security vulnerabilities unless they demonstrate meaningful additional impact:

* Missing security headers without a working exploit
* Clickjacking on pages without sensitive actions
* Self-XSS
* Logout or session-expiration observations without demonstrated impact
* Username or email enumeration without a practical security consequence
* Rate-limiting observations on non-sensitive functionality
* Missing email-domain security configuration without a demonstrated exploit
* Vulnerabilities requiring a compromised user device, browser, or email account
* Attacks requiring physical access to a user’s device
* Reports based only on automated scanner output
* Outdated dependency reports without a working Geyser-specific exploit
* Issues affecting unsupported browsers or obsolete software
* Best-practice recommendations without a concrete security impact
* Findings affecting third-party services that are not controlled by Geyser

Operational problems, feature requests, and ordinary bugs should be reported through the repository’s normal GitHub issue process.

## Good-Faith Research

Geyser supports good-faith security research performed in accordance with this policy.

When your research complies with this policy, we will treat it as authorized security research and will not pursue legal action against you for the research itself. If a third party initiates legal action related to compliant research, we will make reasonable efforts to clarify that your work was conducted under this policy.

This protection does not apply to conduct that causes harm, violates privacy, moves or places funds at risk, exceeds what is reasonably necessary to confirm a vulnerability, or otherwise falls outside this policy.

## Disclosure and Recognition

Please coordinate public disclosure with us. We will work with reporters in good faith to determine a reasonable disclosure timeline based on the severity and complexity of the issue.

Geyser does not currently promise a monetary reward for vulnerability reports. Recognition or rewards may be offered at Geyser’s sole discretion and must not be assumed in advance.

We are happy to acknowledge researchers whose valid reports help improve Geyser’s security, subject to the reporter’s preference and any necessary disclosure restrictions.

Thank you for helping keep Geyser and its community secure.
