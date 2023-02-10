# Contributing

Thanks for choosing to contribute!

The following are a set of guidelines to follow when contributing to this project.

## Code Of Conduct

This project adheres to the Adobe [code of conduct](CODE_OF_CONDUCT.md). By participating,
you are expected to uphold this code. Please report unacceptable behavior to
[Grp-opensourceoffice@adobe.com](mailto:Grp-opensourceoffice@adobe.com).

## Have A Question?

Start by filing an issue. The existing committers on this project work to reach
consensus around project direction and issue solutions within issue threads
(when appropriate).

## Contributor License Agreement

All third-party contributions to this project must be accompanied by a signed contributor
license agreement. This gives Adobe permission to redistribute your contributions
as part of the project. [Sign our CLA](https://opensource.adobe.com/cla.html). You
only need to submit an Adobe CLA one time, so if you have submitted one previously,
you are good to go!

## Code Reviews

All submissions should come in the form of pull requests and need to be reviewed
by project committers. Read [GitHub's pull request documentation](https://help.github.com/articles/about-pull-requests/)
for more information on sending pull requests.

Lastly, please follow the [pull request template](PULL_REQUEST_TEMPLATE.md) when
submitting a pull request!

## From Contributor To Committer

We love contributions from our community! If you'd like to go a step beyond contributor
and become a committer with full write access and a say in the project, you must
be invited to the project. The existing committers employ an internal nomination
process that must reach lazy consensus (silence is approval) before invitations
are issued. If you feel you are qualified and want to get more deeply involved,
feel free to reach out to existing committers to have a conversation about that.

## Security Issues

Security issues shouldn't be reported on this issue tracker. Instead, [file an issue to our security experts](https://helpx.adobe.com/security/alertus.html).

## Site preview from a fork

You can generate the website to view your changes using GitHub Pages.
In your fork's Settings, make sure Actions are enabled and Pages are configured to deploy from the **root** folder of the **gh-pages** branch.

1. Click the **Actions** tab in your forked repo.
1. Choose GitHub Pages (side navigation menu on the left)
1. In the field `This workflow has a workflow_dispatch event trigger.`
   - Open drop-down menu `Run workflow`
   - Select the branch you want to preview as a website
   - **Run workflow**
   - A new run of **Github Pages** will appear in the table of the workflow runs
1. When the workflow run is finished, **Github Pages** will be marked with a green check mark.
1. For the URL of the generated website, navigate to the finished workflow's run **GitHub Pages** > **build-and-deploy** > **GH Pages URL**
