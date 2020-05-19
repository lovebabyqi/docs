# git版本管理

## 1. git基础操作

任何时候不要忘记先配置用户名和邮箱，不然提交一团乱

```ssh
# 查看用户名
git config user.name
# 查看邮箱
git config user.email

# 配置用户名
git config --global user.name "你的用户名"
# 配置邮箱
git config --global user.email "你的邮箱"
```



### 1.1 添加提交操作

在文件夹内右键git bush here开始操作,并创建一个index.html,

1.创建版本库

```javascript
git init	
//初始化会生成一个隐藏.git文件夹
//index.html就处在工作区
//.git文件夹内是暂存区
```

2.添加操作(添加操作把文件修改添加到暂存区)

```javascript
git add 文件名称
git add .
//单独添加某个文件的修改
//添加所有文件的修改使用的是小写的点
```

3.提交操作(每次提交一定要备注)

```javascript
git commit -m"本次提交的描述"
//提交更改，把暂存区的所有内容提交到当前分支
//会提交所有添加后的文件
```

一个完整的版本控制是需要提交到分支上的

```javascript
工作区-->暂存区-->分支
```

### 1.2 查看状态，版本

1.查看当前仓库里所有文件的状态

```javascript
git status
//查看结果 modified: index.html 表示修改了index.html
//working tree is clean	对文件的所有更改都被提交到分支上了
```

2.查看所有分支

```javascript
git branch -v
//-v可以查看分支的提交版本
```

3.查看一个文件修改了哪一部分

```javascript
git diff 文件名
//工作区和暂存区进行对比
```

4.查看提交历史

```javascript
git log
//让日志变得更漂亮
git log --pretty=oneline
```

5.查看所有使用过的命令历史(日志)

```javascript
git reflog
```

### 1.3 撤销操作

1.撤销在工作区还没提交到暂存区的修改

```javascript
git restore 文件名
```

2.撤销已添加到暂存区的修改

```javascript
#撤销单个
git restore --staged 文件名
#撤销多个
git restore --staged .
```

### 1.4 版本回退

1.回到上一个版本

```javascript
git reset --hard HEAD^
//上一个是HEAD^ 回到上上一个是HEAD^^ 回退到10个版本以前HEAD~10
```

2.回到某个特定版本号

```javascript
git reset --hard 版本号
//查看提交历史找到版本号 前7至9位就行
//回退版本之后get log 只剩一个版本 此时可以get reflog得到版本号进行回退

//回退操作会将工作区暂存区,同时修改
```

### 1.5 删除操作

任何删除操作都要谨慎，及时沟通，代码冲突及时沟通。

```javascript
//手动删除一个文件之后，git版本库里依然是有这个文件的，
//如果要把git版本库里的文件也删除掉，使用git rm命令。
//比如说我们现在手动删除了一个叫做index.html的文件，接着
git rm index.html	//删除了版本库里的index.html,暂存区还在
//从版本库里删除之后要再进行一次提交
git commit -m"描述"
```

## 2. git关联远程仓库

### 2.1 创建sshkey

```javascript
//在本地生成
ssh-keygen -t rsa -C "你的邮箱地址"

cat ~/.ssh/id_rsa.pub

//把返回的一堆密码复制一下，填在自己github的设置里
```

我们需要把本地的代码推送到远程:

在推送之前我们需要配置一下git：

```javascript
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

### 2.2 关联远程仓库

```javascript
//在本地 关联远程仓库 origin是为远程仓库设置的别名,之后直接使用别名进行推送
git remote add origin 远程仓库的地址
```

现在我们把两个仓库关联了起来，但是远程仓库里并没有我们本地仓库的代码

```javascript
//在本地    将本地master推送到远程origin仓库
git push origin master
git push -u origin master //使用-u关联后,以后git push,git pull,推送拉取就不需要输入origin master了
```

实际开发时,不能在master分支写代码,每人一条分支,各自推送远程一条分支,master分支必须保持最安全,并且保持最新代码,可能是经理负责远程分支合并到master,每天从master拉取最新的代码,自己在dev分支进行开发,再推送到远程dev.

### 2.3 仓库上的代码克隆到本地：

```javascript
git clone 仓库地址
```

## 3. git分支

### 3.1 分支操作

1.查看当前所处分支

```javascript
git branch
```

2.创建新分支

```javascript
git branch 分支名称        //分支名称多用dev  development
```

3.切换分支

```javascript
git switch 分支名称

//这行命令表示的是创建一个分支并切换到这个分支
git switch -c 分支名称

#假设现在在master(主)分支上
git switch -c dev
#此时我们在master的基础上创建了一个dev分支，并切换到了dev分支如果对比代码我们将发现，两个分支上的代码一模一样
```

4.在dev分支上进行开发

在切换出的dev分支上完成开发后，把代码提交到dev分支：

```javascript
git add .
git commit -m"版本信息"
```

**5.合并**

代码提交到dev分支后，此时master分支上并没有最新的代码，这是我们需要把dev分支上的代码合并到master分支上，合并分支使用命令：

```javascript
git merge 分支名称
```

删除分支：

```javascript
git branch -d 分支名称
```

**6.合并冲突**

出现冲突，不要乱搞，及时沟通。

其实不是每一次合并分支的时候都是一帆风顺的，比如我们现在需要修改一个bug，我们从master分支上切了一个新的分支dev，我们在dev分支上完成修改后进行提交，切回master分支，对master分支也做了修改，修改之后提交，接着我们去合并dev分支上的代码，发现合并失败。在这种情况下git无法对两个分支进行合并，只能尝试把各自的修改合并起来，这种合会出现冲突，我们需要手动去解决冲突。解决完冲突之后:

```javascript
#手动解决冲突之后，再master分支上：
git add .
git commit -m"版本信息"
#接着再删除dev分支就可以了。
git switch dev
git branch -d dev
```

**而在实际开发中，master分支应该是非常稳定的，也就是仅用来发布最新版本，平时不能在上面干活。**

而合并分支我们有两种方式：

```javascript
git merge 分支名称
#如果用git merge来合并的话我们是查看不到分支的合并历史的，因为 git merge是快进模式。
#除了git merge之外还有一种普通合并的模式，使用命令：
git merge --no-ff -m"版本信息" 分支名称
#上边这条命令为什么要加-m参数呢？因为普通合并模式下，git就会在merge时生成一个新的提交，这样，就可以从分支历史上查看的到。而使用git merge是查看不到合并的历史的，那我们如何查看分支历史呢？使用：
git log --graph --pretty=oneline --abbrev-commit
```

分别使用两种不同的合并方式合并分支时，我们打印出来的分支历史是不一样的。

在实际开发中，bug就像家常便饭一样。有了bug就需要修复，在使用git的时候，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

## 4. 其他补充

### 4.1 git临时储存功能

加入你现在正在开发一个新功能，突然接到一个紧急任务，让你修复一个代号为101的bug，很自然得，你想创建一个分支issue-101来修复它，但是你开发新功能的代码还没有提交，并不是你不想提交，而是工作只进行到一半，还没法提交，幸好git还提供了一个临时存储功能，可以帮你把没有提交的代码临时藏起来，等需要的时候再拿给你：

```javascript
#使用git stash命令可以把之前写的代码暂时隐藏起来
git stash
```

那么修复完bug之后我如何把隐藏起来的代码再回复回来呢？

```javascript
#查看被隐藏起来的代码
git stash list
#恢复代码使用
git stash pop
```

这是针对单次的隐藏，如果针对多次隐藏呢？使用：

```javascript
git stash apply stash@{}
#接着删除某个隐藏
git stash drop stash@{}
#git stash pop可以同时完成这两步但是不适合多个隐藏
```

刚刚我们在master分支上修改了一个bug，而我们现在开发新功能的分支就是从master上切换出来的，那么也就是说master分支上的bug现在也存在于开发新功能的分支上，为了避免重复操作，我们可以使用:

```javascript
#这条命令只会把修复master分支bug的代码合并过来
git cherry-pick 版本号(这里的版本号指的是刚修复master分支bug后提交的版本号)
```

### 4.2 添加新功能，创建新分支

在软件开发中，总是有做不完的新功能，在开发新功能的时候必定要去修改原来的代码，这样如果最后遇到bug整个项目就game over了，所以每添加一个新功能，最好创建一个新的分支，开发成功后合并再删除新分支就可以了。但是有的产品经理太傻比了，真他吗的傻比，跟你说开发一个新功能，功能开发完了他又说要把这个新功能给剪掉，开发之前脑子让门挤了吗？不过还好我们并没有把新功能分支上的代码合并到主分支上，那么我们这次使用：

```javascript
git branch -d 分支名称
#这是git给我们报错说这个分支的代码提交后没有合并，因此我们不能删除，不过我们可以强制删除
git branch -D 分支名称
```

我们在向远程仓库推代码的时候使用的是：

```javascript
git push origin 分支名称
```

可是问题来了，我们和其他小伙伴都在开发，分别开发不同的功能，这样不同的人往一个仓库的同一个分支推送东西就产生一种情况，就是我们本地的代码和远程仓库里的代码不同步，如果你的小伙伴比你推送的时间早，那么你再推的时候就推不上去了，因为你你小伙伴最新提交和你视图推送的提交有冲突，解决办法很简单：

```javascript
#使用git pull拉去最新的代码，然后在本地合并解决冲突后再推送，
git pull origin 分支名称
#如果拉去失败，说明本地的这个分支和远程的这个分支没有建立连接，那么我们要手动的建立这个链接
git branch --set-upstream-to=origin 远程分支名称 本地分支名称
#接着再使用 git pull就可以了
git pull origin 远程分支名称
#我们从远程分支拉去最新代码后如果产生冲突，则需要手动解决冲突，冲突解决之后需要提交再推
git commit -m"提交信息"
git push origin 分支名称
```

### 4.3 多人协作

每次推代码，先拉一下，拉下来检查有无冲突，千万不要强推搞事情。

所以在多人协作的时候流程大概是这样的：

1. 视图把本地的代码推送到远程分支上git push origin 分支名称，结果推送失败。
2. 接着从远程分支拉去代码，git pull origin 分支名称，如果有冲突手动合并冲突。
3. 使用git push origin 分支名称。
4. 所以每次提交前先git pull一下是个好习惯。

标签：

```javascript
加入你的leader（领导）问你要某个版本的代码，发给你了一串类似于a10996b的版本号，那么接下来你可能要进行的操作是：

git log
#结果返回了一大推的版本号，要找到这个叫做a10996b可能头都找破了也没找到，这时要是给每次提交都打一个简单的标签，
#必须：v1.0，那么你的boss可能对你说的是，小王，把那个0.9版本的代码发我一下，
#那么你只要找到提交时被标记了v0.9的版本给他
#就可以了，这个操作在git中可不可以实现呢？当然是可以的，怎么做呢？
#先切换到指定分支

git switch 分支名称
```

\#接着

```javascript
git tag v1.0

#这样就ok了，那怎么查看有多少个版本呢？使用：
git tag
#上边这条命令会返回所有的版本号
#那如果上次的版本我忘记打标签了呢？没关系，先使用 git log查找到历史
git log --pretty=oneline --abbrev-commit
#找到版本号之后
git tag v0.9 版本号
#如果标签打错了，也可以删除
git tag -d v1.0
```
### 4.4 git提交后，首页不显示绿点记录

多半是因为没有配置用户名和邮箱，默认提交用户名是`Your Name`，默认邮箱`you@example.com`

**修改git配置作者和邮箱**

只要github和本地的作者保持一致就可以了。

1.修改github的配置，在settings-profile上修改name 和email

2.修改local的git配置：

```js
git config --global user.name "Your Correct Name"
git config --global user.email "your-correct-email@example.com"
```

**修改已提交记录的作者和邮箱**

如果还需要修改已经提交的记录的作者和邮箱。需要以下步骤：

#### 1. 创建临时clone到本地，进入目录

```js
git clone --bare https://github.com/user/repo.git
cd repo.git
```

- OLD_EMAIL 旧的错误的邮箱，为设置的话可能是`you@example.com`
- CORRECT_NAME="正确的用户名"
- CORRECT_EMAIL="正确的，期望的邮箱"

```js
git filter-branch --env-filter '
OLD_EMAIL="“861982926@qq.com”"
CORRECT_NAME="lovebabyqi"
CORRECT_EMAIL="861982926@qq.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

OLD_EMAIL的双层引号写法是由于我的错误邮箱是字符串的邮箱，双层引号表示字符串
#### 2. 检查新的git历史记录看是否有错误

#### 3. 强制推送修改了的git记录到github

```js
git push --force --tags origin 'refs/heads/*'
```

清除临时克隆



