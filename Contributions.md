# REINFLOW CONTRIBUTION GUIDE
ReinFlow is a javascript based prototype smart traffic control platform.

## ReinFlow Contribution Process 📤
Figure out what you’re going to work on. Look through the issue tracker and see if there are any issues you know how to fix. Check the issue labels and work on fixing those issues.

Join us on Slack and let us know you’re interested in getting to know ReinFlow.

#### Reporting issues 💢
Please report issues in issue tracker. (And a pull request for a fix along with it if fixable.)

#### You can work on two main areas.
1. Commiting features
2. Resolving issues

#### 1. Commiting features. ✅
All feature contributions <strong>must be properly documented.</strong> Please follow the respective documentation guidelines when documenting features.

All <strong>new features must be accompanied by relevant unit test</strong> cases on <code>tests</code> folder. All of the javascript tests are conducted by <code>jestjs.</code> 

New features should have code modularity in order to create efficient test. It is better to divide complex operations for smaller functions and run tests on each function.

Tests for hypothetical function <code>src/index.js -> func1()</code> should be included inside <code>tests/test.index.js -> func1()</code>.

#### 2. Resolving issues. ⚠️
Issues related to different features are adviced to be fixed by the auther of the feature or the contributer who identified the issue.

### Commit message guidelines.
Please keep your commit messages short and sweet.
Follow the below naming convention infront of the commit message

1. FEATURE: new feature
1. FIX: bug fix or issue fix
1. UPDATE: minor change to a feature
1. NEW: new sub-project

Happy Coding. 👩‍💻👋