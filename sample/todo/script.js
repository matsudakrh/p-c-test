angular.module('ToDo',[]).controller('TodoController', function () {
    var self = this;


        self.todos = [
            {
                title: 'システム開発',
                done: false
            },
            {
                title: '要件定義',
                done: false
            },
            {
                title: '概要設計',
                done: false
            },
            {
                title: '詳細設計',
                done: false
            },
            {
                title: 'プログラム設計',
                done: false
            },
            {
                title: 'プログラミング',
                done: false
            },
            {
                title: '総合テスト',
                done: false
            },
            {
                title: '受入テスト',
                done: false
            },
            {
                title: '運用テスト',
                done: false
            },
            {
                title: 'リリース',
                done: false
            }
        ];

        self.create = function () {
            self.todos.push({
               title: self.newTodo.title,
                done: false
        });
            self.newTodo = "";
        }

    });