(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{359:function(a,t,s){"use strict";s.r(t);var r=s(33),e=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"git版本管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git版本管理"}},[a._v("#")]),a._v(" git版本管理")]),a._v(" "),s("h2",{attrs:{id:"_1-git基础操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-git基础操作"}},[a._v("#")]),a._v(" 1. git基础操作")]),a._v(" "),s("p",[a._v("任何时候不要忘记先配置用户名和邮箱，不然提交一团乱")]),a._v(" "),s("div",{staticClass:"language-ssh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('# 查看用户名\ngit config user.name\n# 查看邮箱\ngit config user.email\n\n# 配置用户名\ngit config --global user.name "你的用户名"\n# 配置邮箱\ngit config --global user.email "你的邮箱"\n')])])]),s("h3",{attrs:{id:"_1-1-添加提交操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-添加提交操作"}},[a._v("#")]),a._v(" 1.1 添加提交操作")]),a._v(" "),s("p",[a._v("在文件夹内右键git bush here开始操作,并创建一个index.html,")]),a._v(" "),s("p",[a._v("1.创建版本库")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git init\t\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//初始化会生成一个隐藏.git文件夹")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//index.html就处在工作区")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//.git文件夹内是暂存区")]),a._v("\n")])])]),s("p",[a._v("2.添加操作(添加操作把文件修改添加到暂存区)")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git add 文件名称\ngit add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//单独添加某个文件的修改")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//添加所有文件的修改使用的是小写的点")]),a._v("\n")])])]),s("p",[a._v("3.提交操作(每次提交一定要备注)")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"本次提交的描述"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//提交更改，把暂存区的所有内容提交到当前分支")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//会提交所有添加后的文件")]),a._v("\n")])])]),s("p",[a._v("一个完整的版本控制是需要提交到分支上的")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("工作区"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("暂存区"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("分支\n")])])]),s("h3",{attrs:{id:"_1-2-查看状态，版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-查看状态，版本"}},[a._v("#")]),a._v(" 1.2 查看状态，版本")]),a._v(" "),s("p",[a._v("1.查看当前仓库里所有文件的状态")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git status\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//查看结果 modified: index.html 表示修改了index.html")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//working tree is clean\t对文件的所有更改都被提交到分支上了")]),a._v("\n")])])]),s("p",[a._v("2.查看所有分支")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//-v可以查看分支的提交版本")]),a._v("\n")])])]),s("p",[a._v("3.查看一个文件修改了哪一部分")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git diff 文件名\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//工作区和暂存区进行对比")]),a._v("\n")])])]),s("p",[a._v("4.查看提交历史")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git log\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//让日志变得更漂亮")]),a._v("\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("pretty"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("oneline\n")])])]),s("p",[a._v("5.查看所有使用过的命令历史(日志)")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git reflog\n")])])]),s("h3",{attrs:{id:"_1-3-撤销操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-撤销操作"}},[a._v("#")]),a._v(" 1.3 撤销操作")]),a._v(" "),s("p",[a._v("1.撤销在工作区还没提交到暂存区的修改")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git restore 文件名\n")])])]),s("p",[a._v("2.撤销已添加到暂存区的修改")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#撤销单个\ngit restore "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("staged 文件名\n#撤销多个\ngit restore "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("staged "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\n")])])]),s("h3",{attrs:{id:"_1-4-版本回退"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-版本回退"}},[a._v("#")]),a._v(" 1.4 版本回退")]),a._v(" "),s("p",[a._v("1.回到上一个版本")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("hard "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("HEAD")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("^")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//上一个是HEAD^ 回到上上一个是HEAD^^ 回退到10个版本以前HEAD~10")]),a._v("\n")])])]),s("p",[a._v("2.回到某个特定版本号")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("hard 版本号\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//查看提交历史找到版本号 前7至9位就行")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//回退版本之后get log 只剩一个版本 此时可以get reflog得到版本号进行回退")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//回退操作会将工作区暂存区,同时修改")]),a._v("\n")])])]),s("h3",{attrs:{id:"_1-5-删除操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-删除操作"}},[a._v("#")]),a._v(" 1.5 删除操作")]),a._v(" "),s("p",[a._v("任何删除操作都要谨慎，及时沟通，代码冲突及时沟通。")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//手动删除一个文件之后，git版本库里依然是有这个文件的，")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//如果要把git版本库里的文件也删除掉，使用git rm命令。")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//比如说我们现在手动删除了一个叫做index.html的文件，接着")]),a._v("\ngit rm index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("html\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//删除了版本库里的index.html,暂存区还在")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//从版本库里删除之后要再进行一次提交")]),a._v("\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"描述"')]),a._v("\n")])])]),s("p",[a._v("还有一种情况，例如推送时把本地配置文件给推送上去了 ( 不应该推送的文件，本地应该保留 ) 或者我们需要删除一个远程文件，这时候如果直接修改 .gitignore 配置排除是不行的，本地版本库里已经存在了。")]),a._v(" "),s("p",[a._v("我们需要删除本地版本库里的文件，该删除操作只是将文件从版本库移除，并不会真正的删除本地文件。")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git rm "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("r "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("cached yarn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("lock\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//在gitbash 操作时选择文件或文件夹 按 Tab 是有提示的")]),a._v("\n")])])]),s("p",[a._v("提示移除成功后，配置 .gitignore 排除不需要推送的文件，再进行添加提交操作，提交成功，远程文件也正常了。")]),a._v(" "),s("h2",{attrs:{id:"_2-git关联远程仓库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-git关联远程仓库"}},[a._v("#")]),a._v(" 2. git关联远程仓库")]),a._v(" "),s("h3",{attrs:{id:"_2-1-创建sshkey"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-创建sshkey"}},[a._v("#")]),a._v(" 2.1 创建sshkey")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//在本地生成")]),a._v("\nssh"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("keygen "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("t rsa "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("C")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"你的邮箱地址"')]),a._v("\n\ncat "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("ssh"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("id_rsa"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("pub\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//把返回的一堆密码复制一下，填在自己github的设置里")]),a._v("\n")])])]),s("p",[a._v("我们需要把本地的代码推送到远程:")]),a._v(" "),s("p",[a._v("在推送之前我们需要配置一下git：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git config "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("global user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("name "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"你的用户名"')]),a._v("\ngit config "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("global user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("email "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"你的邮箱"')]),a._v("\n")])])]),s("h3",{attrs:{id:"_2-2-关联远程仓库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-关联远程仓库"}},[a._v("#")]),a._v(" 2.2 关联远程仓库")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//在本地 关联远程仓库 origin是为远程仓库设置的别名,之后直接使用别名进行推送")]),a._v("\ngit remote add origin 远程仓库的地址\n")])])]),s("p",[a._v("现在我们把两个仓库关联了起来，但是远程仓库里并没有我们本地仓库的代码")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//在本地    将本地master推送到远程origin仓库")]),a._v("\ngit push origin master\ngit push "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("u origin master "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//使用-u关联后,以后git push,git pull,推送拉取就不需要输入origin master了")]),a._v("\n")])])]),s("p",[a._v("实际开发时,不能在master分支写代码,每人一条分支,各自推送远程一条分支,master分支必须保持最安全,并且保持最新代码,可能是经理负责远程分支合并到master,每天从master拉取最新的代码,自己在dev分支进行开发,再推送到远程dev.")]),a._v(" "),s("h3",{attrs:{id:"_2-3-仓库上的代码克隆到本地："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-仓库上的代码克隆到本地："}},[a._v("#")]),a._v(" 2.3 仓库上的代码克隆到本地：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git clone 仓库地址\n")])])]),s("h2",{attrs:{id:"_3-git分支"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-git分支"}},[a._v("#")]),a._v(" 3. git分支")]),a._v(" "),s("h3",{attrs:{id:"_3-1-分支操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-分支操作"}},[a._v("#")]),a._v(" 3.1 分支操作")]),a._v(" "),s("p",[a._v("1.查看当前所处分支")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git branch\n")])])]),s("p",[a._v("2.创建新分支")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git branch 分支名称        "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//分支名称多用dev  development")]),a._v("\n")])])]),s("p",[a._v("3.切换分支")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("switch")]),a._v(" 分支名称\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//这行命令表示的是创建一个分支并切换到这个分支")]),a._v("\ngit "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("switch")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("c 分支名称\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("#假设现在在master")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("主"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("分支上\ngit "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("switch")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("c dev\n#此时我们在master的基础上创建了一个dev分支，并切换到了dev分支如果对比代码我们将发现，两个分支上的代码一模一样\n")])])]),s("p",[a._v("4.在dev分支上进行开发")]),a._v(" "),s("p",[a._v("在切换出的dev分支上完成开发后，把代码提交到dev分支：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"版本信息"')]),a._v("\n")])])]),s("p",[s("strong",[a._v("5.合并")])]),a._v(" "),s("p",[a._v("代码提交到dev分支后，此时master分支上并没有最新的代码，这是我们需要把dev分支上的代码合并到master分支上，合并分支使用命令：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git merge 分支名称\n")])])]),s("p",[a._v("删除分支：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d 分支名称\n")])])]),s("p",[s("strong",[a._v("6.合并冲突")])]),a._v(" "),s("p",[a._v("出现冲突，不要乱搞，及时沟通。")]),a._v(" "),s("p",[a._v("其实不是每一次合并分支的时候都是一帆风顺的，比如我们现在需要修改一个bug，我们从master分支上切了一个新的分支dev，我们在dev分支上完成修改后进行提交，切回master分支，对master分支也做了修改，修改之后提交，接着我们去合并dev分支上的代码，发现合并失败。在这种情况下git无法对两个分支进行合并，只能尝试把各自的修改合并起来，这种合会出现冲突，我们需要手动去解决冲突。解决完冲突之后:")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#手动解决冲突之后，再master分支上：\ngit add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"版本信息"')]),a._v("\n#接着再删除dev分支就可以了。\ngit "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("switch")]),a._v(" dev\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d dev\n")])])]),s("p",[s("strong",[a._v("而在实际开发中，master分支应该是非常稳定的，也就是仅用来发布最新版本，平时不能在上面干活。")])]),a._v(" "),s("p",[a._v("而合并分支我们有两种方式：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git merge 分支名称\n#如果用git merge来合并的话我们是查看不到分支的合并历史的，因为 git merge是快进模式。\n#除了git merge之外还有一种普通合并的模式，使用命令：\ngit merge "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("no"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("ff "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"版本信息"')]),a._v(" 分支名称\n#上边这条命令为什么要加"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m参数呢？因为普通合并模式下，git就会在merge时生成一个新的提交，这样，就可以从分支历史上查看的到。而使用git merge是查看不到合并的历史的，那我们如何查看分支历史呢？使用：\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("graph "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("pretty"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("oneline "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("abbrev"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("commit\n")])])]),s("p",[a._v("分别使用两种不同的合并方式合并分支时，我们打印出来的分支历史是不一样的。")]),a._v(" "),s("p",[a._v("在实际开发中，bug就像家常便饭一样。有了bug就需要修复，在使用git的时候，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。")]),a._v(" "),s("h2",{attrs:{id:"_4-其他补充"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-其他补充"}},[a._v("#")]),a._v(" 4. 其他补充")]),a._v(" "),s("h3",{attrs:{id:"_4-1-git临时储存功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-git临时储存功能"}},[a._v("#")]),a._v(" 4.1 git临时储存功能")]),a._v(" "),s("p",[a._v("加入你现在正在开发一个新功能，突然接到一个紧急任务，让你修复一个代号为101的bug，很自然得，你想创建一个分支issue-101来修复它，但是你开发新功能的代码还没有提交，并不是你不想提交，而是工作只进行到一半，还没法提交，幸好git还提供了一个临时存储功能，可以帮你把没有提交的代码临时藏起来，等需要的时候再拿给你：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#使用git stash命令可以把之前写的代码暂时隐藏起来\ngit stash\n")])])]),s("p",[a._v("那么修复完bug之后我如何把隐藏起来的代码再回复回来呢？")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#查看被隐藏起来的代码\ngit stash list\n#恢复代码使用\ngit stash pop\n")])])]),s("p",[a._v("这是针对单次的隐藏，如果针对多次隐藏呢？使用：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git stash apply stash@"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n#接着删除某个隐藏\ngit stash drop stash@"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n#git stash pop可以同时完成这两步但是不适合多个隐藏\n")])])]),s("p",[a._v("刚刚我们在master分支上修改了一个bug，而我们现在开发新功能的分支就是从master上切换出来的，那么也就是说master分支上的bug现在也存在于开发新功能的分支上，为了避免重复操作，我们可以使用:")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#这条命令只会把修复master分支bug的代码合并过来\ngit cherry"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("pick "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("版本号")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("这里的版本号指的是刚修复master分支bug后提交的版本号"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("h3",{attrs:{id:"_4-2-添加新功能，创建新分支"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-添加新功能，创建新分支"}},[a._v("#")]),a._v(" 4.2 添加新功能，创建新分支")]),a._v(" "),s("p",[a._v("在软件开发中，总是有做不完的新功能，在开发新功能的时候必定要去修改原来的代码，这样如果最后遇到bug整个项目就game over了，所以每添加一个新功能，最好创建一个新的分支，开发成功后合并再删除新分支就可以了。但是有的产品经理太傻比了，真他吗的傻比，跟你说开发一个新功能，功能开发完了他又说要把这个新功能给剪掉，开发之前脑子让门挤了吗？不过还好我们并没有把新功能分支上的代码合并到主分支上，那么我们这次使用：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d 分支名称\n#这是git给我们报错说这个分支的代码提交后没有合并，因此我们不能删除，不过我们可以强制删除\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("D")]),a._v(" 分支名称\n")])])]),s("p",[a._v("我们在向远程仓库推代码的时候使用的是：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git push origin 分支名称\n")])])]),s("p",[a._v("可是问题来了，我们和其他小伙伴都在开发，分别开发不同的功能，这样不同的人往一个仓库的同一个分支推送东西就产生一种情况，就是我们本地的代码和远程仓库里的代码不同步，如果你的小伙伴比你推送的时间早，那么你再推的时候就推不上去了，因为你你小伙伴最新提交和你视图推送的提交有冲突，解决办法很简单：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("#使用git pull拉去最新的代码，然后在本地合并解决冲突后再推送，\ngit pull origin 分支名称\n#如果拉去失败，说明本地的这个分支和远程的这个分支没有建立连接，那么我们要手动的建立这个链接\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("set")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("upstream"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("to"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("origin 远程分支名称 本地分支名称\n#接着再使用 git pull就可以了\ngit pull origin 远程分支名称\n#我们从远程分支拉去最新代码后如果产生冲突，则需要手动解决冲突，冲突解决之后需要提交再推\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("m"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"提交信息"')]),a._v("\ngit push origin 分支名称\n")])])]),s("h3",{attrs:{id:"_4-3-多人协作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-多人协作"}},[a._v("#")]),a._v(" 4.3 多人协作")]),a._v(" "),s("p",[a._v("每次推代码，先拉一下，拉下来检查有无冲突，千万不要强推搞事情。")]),a._v(" "),s("p",[a._v("所以在多人协作的时候流程大概是这样的：")]),a._v(" "),s("ol",[s("li",[a._v("视图把本地的代码推送到远程分支上git push origin 分支名称，结果推送失败。")]),a._v(" "),s("li",[a._v("接着从远程分支拉去代码，git pull origin 分支名称，如果有冲突手动合并冲突。")]),a._v(" "),s("li",[a._v("使用git push origin 分支名称。")]),a._v(" "),s("li",[a._v("所以每次提交前先git pull一下是个好习惯。")])]),a._v(" "),s("p",[a._v("标签：")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("加入你的leader（领导）问你要某个版本的代码，发给你了一串类似于a10996b的版本号，那么接下来你可能要进行的操作是：\n\ngit log\n#结果返回了一大推的版本号，要找到这个叫做a10996b可能头都找破了也没找到，这时要是给每次提交都打一个简单的标签，\n#必须：v1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("，那么你的boss可能对你说的是，小王，把那个"),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.9")]),a._v("版本的代码发我一下，\n#那么你只要找到提交时被标记了v0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("9")]),a._v("的版本给他\n#就可以了，这个操作在git中可不可以实现呢？当然是可以的，怎么做呢？\n#先切换到指定分支\n\ngit "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("switch")]),a._v(" 分支名称\n")])])]),s("p",[a._v("#接着")]),a._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[a._v("git tag v1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n\n#这样就ok了，那怎么查看有多少个版本呢？使用：\ngit tag\n#上边这条命令会返回所有的版本号\n#那如果上次的版本我忘记打标签了呢？没关系，先使用 git log查找到历史\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("pretty"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("oneline "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("abbrev"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("commit\n#找到版本号之后\ngit tag v0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("9")]),a._v(" 版本号\n#如果标签打错了，也可以删除\ngit tag "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d v1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n")])])]),s("h3",{attrs:{id:"_4-4-git提交后，首页不显示绿点记录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-git提交后，首页不显示绿点记录"}},[a._v("#")]),a._v(" 4.4 git提交后，首页不显示绿点记录")]),a._v(" "),s("p",[a._v("多半是因为没有配置用户名和邮箱，默认提交用户名是"),s("code",[a._v("Your Name")]),a._v("，默认邮箱"),s("code",[a._v("you@example.com")])]),a._v(" "),s("p",[s("strong",[a._v("修改git配置作者和邮箱")])]),a._v(" "),s("p",[a._v("只要github和本地的作者保持一致就可以了。")]),a._v(" "),s("p",[a._v("1.修改github的配置，在settings-profile上修改name 和email")]),a._v(" "),s("p",[a._v("2.修改local的git配置：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("git config "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("global user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("name "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Your Correct Name"')]),a._v("\ngit config "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("global user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("email "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"your-correct-email@example.com"')]),a._v("\n")])])]),s("p",[s("strong",[a._v("修改已提交记录的作者和邮箱")])]),a._v(" "),s("p",[a._v("如果还需要修改已经提交的记录的作者和邮箱。需要以下步骤：")]),a._v(" "),s("h4",{attrs:{id:"_1-创建临时clone到本地，进入目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建临时clone到本地，进入目录"}},[a._v("#")]),a._v(" 1. 创建临时clone到本地，进入目录")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("git clone "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("bare https"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("github"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("com"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("user"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("repo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("git\ncd repo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("git\n")])])]),s("ul",[s("li",[a._v("OLD_EMAIL 旧的错误的邮箱，为设置的话可能是"),s("code",[a._v("you@example.com")])]),a._v(" "),s("li",[a._v('CORRECT_NAME="正确的用户名"')]),a._v(" "),s("li",[a._v('CORRECT_EMAIL="正确的，期望的邮箱"')])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("git filter"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("env"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("filter '\n"),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("OLD_EMAIL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"“861982926@qq.com”"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("CORRECT_NAME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"lovebabyqi"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("CORRECT_EMAIL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"861982926@qq.com"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$GIT_COMMITTER_EMAIL"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$OLD_EMAIL"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\nthen\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("GIT_COMMITTER_NAME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$CORRECT_NAME"')]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("GIT_COMMITTER_EMAIL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$CORRECT_EMAIL"')]),a._v("\nfi\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$GIT_AUTHOR_EMAIL"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$OLD_EMAIL"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\nthen\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("GIT_AUTHOR_NAME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$CORRECT_NAME"')]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("GIT_AUTHOR_EMAIL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"$CORRECT_EMAIL"')]),a._v("\nfi\n' "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("tag"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("filter cat "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("branches "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("tags\n")])])]),s("p",[a._v("OLD_EMAIL的双层引号写法是由于我的错误邮箱是字符串的邮箱，双层引号表示字符串")]),a._v(" "),s("h4",{attrs:{id:"_2-检查新的git历史记录看是否有错误"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-检查新的git历史记录看是否有错误"}},[a._v("#")]),a._v(" 2. 检查新的git历史记录看是否有错误")]),a._v(" "),s("h4",{attrs:{id:"_3-强制推送修改了的git记录到github"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-强制推送修改了的git记录到github"}},[a._v("#")]),a._v(" 3. 强制推送修改了的git记录到github")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("git push "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("force "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("tags origin "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'refs/heads/*'")]),a._v("\n")])])]),s("p",[a._v("清除临时克隆")])])}),[],!1,null,null,null);t.default=e.exports}}]);