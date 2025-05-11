# Report

- Full Name: Brahim Belmouhand
- Student Number: r0956428
- Full Name of person you made your full stack project with: (Egor Kolomiets)
- Student Number of person you made your full stack project with:
- Brief description of your project and the technologies used for front- and back-end:

# Cryptography

## Before

Describe in a few sentences what the actual status is (before changing).
The use of JWT security.
## After

Describe in a few sentences what you

- kept in your project
I kept the JWT because it's a secure way for authenticating and authorizing a user
- changed in your project
  (explain how you found it, and why you kept/changed it)
I added front-end password validation to force the client to use more secure passwords upon registration
I added limits on how many times you can try to login or register to prevent online bruteforce attacks

## Code Examples

Mention here wat parts of the code you changed (referencing exact class/file-name and code lines)

# Injections

(maximum a half A4-page of text, code snippets and screenshots not included)

## Before

Describe in a few sentences what the actual status is (before changing).

All input fields received raw input, people could inject SQL or run XSS on my input fields to threaten the security of my website. I changed that by using the dependency "dompurify" on the front-end input fields to prevent XSS and used the dependency "sanitize-html"
for preventing SQLi's.

## After

Describe in a few sentences what you

- kept in your project

I kept the input logic and validation from before, so people are prompted to enter the type of text I want. I also kept Prisma as ORM beecause it prevents SQLi's on its own as it's kind of modern.

- changed in your project
  (explain how you found it, and why you kept/changed it)
  (if frameworks, libraries already provide defense mechanisms, please explain how and what they actually do)

I added dompurify and sanitize-html to sanitize all input for SQLi and XSS prevention. I also sanitized it in the backend by sanitize URL input before redirecting the input to the service layer.

## Code Examples

Mention here what parts of the code you changed (referencing exact class/file-name and code lines)



# Class 04 Vulnerable & Outdated components

## SBOM & Dependency Check

Describe in a few sentences how you generated you SBOM, incl. the tools you used and the issues you encountered.
Describe in a few sentences how you checked if you used vulnerable dependencies.

I installed the npm package `cyclonedx/bom` to be able to generate an xml file of my SBOM (Software Bill Of Materials) using this command:
`npx @cyclonedx/bom -o sbom.xml`

I checked if I had vulnerable dependency versions using `npm audit`. 

## Vulnerabilities

List here the vulnerabilities you have found in direct dependencies or transitive dependencies.
Refer to the SBOM in appendix (don't put it in here).

### npm audit report

libxmljs2  *

Severity: critical

libxmljs2 vulnerable to type confusion when parsing specially crafted 
XML - https://github.com/advisories/GHSA-78h3-pg4x-j8cv

fix available via `npm audit fix`

node_modules/libxmljs2
  @cyclonedx/cyclonedx-library  >=1.14.0-rc.0
  Depends on vulnerable versions of libxmljs2
  node_modules/@cyclonedx/cyclonedx-library
    @cyclonedx/cyclonedx-npm  >=1.11.0
    Depends on vulnerable versions of @cyclonedx/cyclonedx-library
    node_modules/@cyclonedx/cyclonedx-npm

3 critical severity vulnerabilities

### npm audit report

next  15.0.0 - 15.2.2
Severity: critical
Authorization Bypass in Next.js Middleware - https://github.com/advisories/GHSA-f82v-jwr5-mffw
fix available via `npm audit fix --force`
Will install next@15.3.2, which is outside the stated dependency range
node_modules/next

1 critical severity vulnerability

To address all issues, run:
  `npm audit fix --force`

## Vulnerabilities - Updated

What vulnerabilities were you able to mitigate (by upgrading) and why did you choose to do so?

### npm audit report

libxmljs2  *
Severity: critical
libxmljs2 vulnerable to type confusion when parsing specially crafted XML - https://github.com/advisories/GHSA-78h3-pg4x-j8cv
fix available via `npm audit fix`
node_modules/libxmljs2

1 critical severity vulnerability

What vulnerabilities did you keep (and why)?

I kept the vulnerability libxm1js2 because the `npm audit fix` wasn't able to seemingly mitigate that one in my back-end. I mitigated all my vulnerabilities in my front-end even though using `npm audit fix --force` could break your application.

# Class 05/06/07 - Authentication, Session Management & Authorization

(guideline: max 2 A4 pages, images/code snippets not counted)
Describe each of the following functionalities in your application AS IS:

- user registration & user removal

I could regisster users but not remove them. I should've added that functionality for my full-stack project but sadly I didn't find the time to do so as I was stuck on a bidirectional relation in prisma. Later, I found out express.js doesn't really support bidirectional relationships, so that was wasted time.
- user authentication

I used JWT (JSON WebToken) as a means of authentication, to provide secure access to my website.
- password forgotten

I didn't add the functionality because I didn't have the time so either.
- change password

I didn't add the functionality because I didn't have the time so either.
- session management (Stateful or Stateless, how session information is being created, stored and transferred, where do you access it, where do you verify it, how do you terminate it, ...). Also include screenshot(s) of the whole cookie/token/header (so I can clearly see all properties and the value).

- access control (what roles, permissions, ... do you have and how and where do you check them, but also do you enable CORS and/or CSP and/or CSRF and how did you configure it)

For the functionalities you did not have yet, implement them. Or if not feasible, describe how you would implement them but why it's not feasible for you. When evaluating this, based on what we saw in class, did you improve your functionalities or code? If so, please explain what you changed and why.

How did you test/check for vulnerabilities?
Were you able to perform any kind of session attack or access control on your application?

# Class 08 - Secure CI/CD & Supply Chain

## Project for this course

To what phase in the CI/CD cycle did your application go and what threats could you possibly identify (categorize per SLSA item)?
Were you able to mitigate one of them?
If yes, explain how you did it.
If not, why was it impossible to mitigate?

I did not implement CI/CD on this application.

## Project for the SE course

Did you follow the SE topic already or are you following it in parallel? If yes, can you identify possible threats in that project?
Were you able to mitigate one of them?
If yes, explain how you did it.
If not, why was it impossible to mitigate?



# Class 09 SSRF

Does your application process user controlled URL's? If yes, would an SSRF attack be possible? Were you able to mitigate this risk, and how? (max. 10 lines)

It doesn't, I wrote the logic for SSRF protection but I didn't implement it yet on my routes in the controller layer. It would've been nicer to do so if it weren't for these time constraints, I'm using this project nevertheless and will keep on updating it with the material I've learnt throughout this course. So in short, no, I haven't been able to mitigate it because this part is unfinished.

Due to other deadlines which also required a lot of effort and time such as the SE course, I haven't been able to give this project my all.

# Class 09 Logging & Monitoring

Evaluate the 7 sacred rules against your application. What logging framework do you use or did you implement on top?
Can you provide me with a valuable snippet of the logging for a 5 minute use of the application?

(max. 10 lines + print screen of log)

# Class 09 SAST

What SAST Tool did you install in your IDE?

- ESLint

What errors did you get (copy paste the basic error messages)?

- 

What errors were you able to fix, and how? (max 3 lines per fix)

- 
# Class 09 DAST

Launch ZAP egainst your application. First not authenticated, then in a second scan being authenticated.

Export each result to a report and add to appendix.

What errors were you able to fix, and how? (max 3 lines per fix)

I partly fixed the clickjack problem and the csp problem. I used `helmet` to add a CSP and a frameguard to the backend and exported my CSP also on the front-end.

I didn't solve the directory listing problem.

# Class 10 topic

# Conclusion

Write a conclusion (most important thing you changed and learned) and identify at least one example (per security principle) of how you implemented the security principles.

I have added certain features such as the logic of changing passwords when forgetting and implemented account removal. I also added SQLi prevention and sanitization to prevent XSS attacks. I also mitigated certain vulnerabilities by using the npm audit fix command and added SSRF protection logic, even though I didn't implement this fully. Part A has been terrific and I liked the labs a lot. I also modified my use of helmet thanks to my DAST (OWASP ZAP). I haven't been able to complete the log&mon part either, but I did install winston and loglevel and started making the logging, but due to time constraints haven't been able to finish it.

# Appendix

## Tools used

Mention here all the tools/libraries you used for improving the security.
Provide me below with both pentest reports from ZAP:
### ZAP Test (non authenticated)

It's found under the folder gamestore/analysis

### ZAP Test (authenticated)



## Vulnerabilities discovered

Put here the full list of CVE's you found that were applicable to your code (or the libraries you used)

The Alerts only show CWE's on my report.
The CWE ID's were 693, 1021 and 497.

### SBOM

Put here your SBOM file.

You can find the SBOM.xml in the back-end and front-end root folder.

(I didn't complete the last question)
## Most interesting conversation with a GenAI tool

Here, I expect you to copy paste a full transcript of the most interesting conversation you had with a genAI tool (also mention which one and what version).
