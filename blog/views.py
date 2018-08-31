from django.shortcuts import render, get_object_or_404, redirect
# from django.utils import timezone
from .models import Post
from .forms import PostForm
from django.contrib.auth.decorators import login_required


def blog_home(request):
    posts = Post.objects.order_by('id')[:5].reverse()
    return render(request, 'blog/blog_home.html', {'posts': posts})


def blog_list(request):
    posts = Post.objects.order_by('id').reverse()
    return render(request, 'blog/blog_list.html', {'posts': posts})


def blog_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/blog_detail.html', {'post': post})


def blog_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            return redirect('blog:blog_detail', pk=post.pk)
    else:
        form = PostForm()
    return render(request, 'blog/blog_edit.html', {'form':form})


@login_required
def blog_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save()
            return redirect('blog:blog_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/blog_edit.html', {'form':form})


@login_required
def blog_remove(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect('blog:blog_list')


def blog_game(request):
    return render(request, 'blog/blog_game.html', {})


def blog_canvas(request):
    return render(request, 'blog/blog_canvas.html', {})


def blog_timer(request):
    return render(request, 'blog/blog_timer.html', {})


def blog_ilist(request):
    return render(request, 'blog/blog_ilist.html', {})


def blog_image(request):
    return render(request, 'blog/blog_image.html', {})
