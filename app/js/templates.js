angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("chat-window.html","<article class=\"view__chat-post row\" ng-repeat=\"msg in chatwin.messages\">\n    <div class=\"col-md-3 post-author\">\n        {{ msg.sendername }}, {{ msg.sent | date:\'dd/MM/yyyy HH:mm\' }}\n    </div>\n    <div class=\"col-md-9 post-message\">\n        {{ msg.text }}\n    </div>\n</article>\n");
$templateCache.put("chat.html","<nav ng-include=\"\'navigation.html\'\" class=\"nav__top\"></nav>\n<div class=\"container view__chat\">\n    <h2 class=\"col-md-12\">Czat</h2>\n\n    <div class=\"row\">\n        <nav class=\"col-md-3 view__chat-groups\">\n            <ul>\n                <!-- <li class=\"active\"><a href=\"#\">Konwersacja 1</a></li>\n                <li><a href=\"#\">Konwersacja 2</a></li>\n                <li><a href=\"#\">Konwersacja 3</a></li> -->\n\n                <li ng-repeat=\"conversation in chat.groups\" ui-sref-active=\"active\" ng-class=\"{ \'unread\': conversation.unread }\">\n                    <a ui-sref=\"Chat.Message({ gid: conversation.groupid })\">{{ conversation.members }}</a>\n                </li>\n            </ul>\n        </nav>\n        <section class=\"col-md-9 view__chat-window\" ui-view>\n\n        </section>\n    </div>\n    <div class=\"row\">\n        <div class=\"form-group col-md-3\">\n            <select name=\"\" class=\"form-control\" id=\"newConversationSelect\">\n                <option><em>Nowa konwersacja...</em></option>\n                <optgroup label=\"Użytkownicy\">\n                    <option value=\"{{ user.id }}\" ng-repeat=\"user in chat.users()\">{{ user.displayname }}</option>\n                </optgroup>\n            </select>\n\n        </div>\n        <div class=\"form-group col-md-9\">\n            <textarea name=\"\" id=\"\" ng-model=\"chat.newMessage.text\" class=\"form-control\"\n                placeholder=\"Wpisz wiadomość...\" chat-textbox=\"chat.actions.postMessage()\"></textarea>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("login.html","<section class=\"main__login\">\n\n    <form ng-submit=\"login.signIn()\" class=\"form-horizontal text-center\">\n        <h2>Logowanie</h2>\n        <div class=\"row\">\n            <input type=\"text\" ng-model=\"login.data.userName\" id=\"loginUserName\"\n            placeholder=\"Login\">\n        </div>\n        <div class=\"row\">\n            <input type=\"password\" ng-model=\"login.data.userPass\" id=\"loginUserPassword\"\n            placeholder=\"Hasło\">\n        </div>\n        <div class=\"row\">\n            <button type=\"submit\" class=\"btn-default\">Zaloguj się!</button>\n        </div>\n        <div class=\"row login-error\" ng-if=\"login.error\">\n            <p ng-if=\"login.error.status === 403\"><i class=\"fa fa-times\"></i> Nieprawidłowa nazwa użytkownika i/lub hasło!</p>\n            <p ng-if=\"login.error.status === 404\"><i class=\"fa fa-times\"></i> Brak połączenia z serwerem!</p>\n        </div>\n    </form>\n</section>\n");
$templateCache.put("navigation.html","<div class=\"container\" ng-controller=\"NavigationViewCtrl as nav\">\n    <ul>\n        <li ng-repeat=\"menuItem in nav.menu\">\n            <a ui-sref=\"{{ menuItem.targetState }}\" ui-sref-active=\"active\">\n                <i class=\"fa fa-{{ menuItem.icon }}\" ng-if=\"menuItem.icon\"></i><span>{{ menuItem.label }}</span>\n            </a>\n        </li>\n        <li>\n            <a href=\"#\" ng-click=\"main.login.signOut()\" class=\"logout\">\n                <i class=\"fa fa-sign-out\"></i><span>Wyloguj</span>\n            </a>\n        </li>\n    </ul>\n</div>\n");
$templateCache.put("projects-list.html","<nav ng-include=\"\'navigation.html\'\" class=\"nav__top\"></nav>\n<div class=\"container view__projects\">\n    <!-- <div class=\"row text-right\">\n        <button class=\"btn btn-default\" ng-click=\"main.login.signOut()\">Wyloguj</button>\n    </div> -->\n\n    <h2>Projekty</h2>\n\n    <table class=\"table\" paginated-table data-posts-per-page=\"8\" data-source=\"projects.list\">\n        <tr>\n            <th>Lp.</th><th>Nazwa</th><th>Zarządzca</th><th>Opis</th><th>Deadline</th><th>% wykonania</th>\n        </tr>\n        <tr ng-repeat=\"project in table.posts\">\n            <td>{{ $index+1 }}</td>\n            <td><a ui-sref=\"ProjectsSingle({ id: project.id })\">{{ project.name }}</a></td>\n            <td>\n                <span ng-if=\"project.ownername\">{{ project.ownername }}</span>\n                <span ng-if=\"!project.ownername\">(brak)</span>\n            </td>\n            <td>{{ project.description }}</td>\n            <td>{{ project.duedate | date:\'dd/MM/yyyy HH:mm\' }}</td>\n            <td>{{ project.progress }}%</td>\n        </tr>\n    </table>\n    <div>\n        <button class=\"btn\" ng-click=\"projects.addForm.visible = !projects.addForm.visible\"\n        ng-class=\"{ \'btn-default\': projects.addForm.visible, \'btn-primary\': !projects.addForm.visible }\" ng-disabled=\"!main.tokenData().admin\">\n            <i class=\"fa fa-plus\"></i> Dodaj projekt\n        </button>\n    </div>\n    <div ng-if=\"projects.addForm.visible\">\n        <form ng-submit=\"projects.actions.add()\" class=\"form-horizontal form-add-user\">\n            <div class=\"form-group\">\n                <label for=\"newProjectName\" class=\"col-sm-2\">Nazwa projektu</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"text\" ng-model=\"projects.newItem.name\" class=\"form-control\" id=\"newProjectName\" required>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"newProjectDescription\" class=\"col-sm-2\">Opis</label>\n                <div class=\"col-sm-10\">\n                    <textarea ng-model=\"projects.newItem.description\" class=\"form-control\" id=\"newProjectDescription\" required>\n                    </textarea>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"newProjectDeadline\" class=\"col-sm-2\">Deadline</label>\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" ng-model=\"projects.newItem.dldate\" placeholder=\"Format: DD/MM/RRRR\"\n                     class=\"form-control\" id=\"newProjectDeadline\" pattern=\"^\\d{2}/\\d{2}/\\d{4}$\" required>\n                </div>\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" ng-model=\"projects.newItem.dltime\" class=\"form-control\" placeholder=\"Format: HH:MM\" pattern=\"^\\d{2}:\\d{2}$\" required>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-sm-offset-2 col-sm-10\">\n                    <button class=\"btn btn-primary\">Zatwierdź</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n");
$templateCache.put("projects-single.html","<nav ng-include=\"\'navigation.html\'\" class=\"nav__top\"></nav>\n<div class=\"container view__projects--single\">\n    <!-- <div class=\"row text-right\">\n        <button class=\"btn btn-default\" ng-click=\"main.login.signOut()\">Wyloguj</button>\n    </div> -->\n    <p>\n        <a ui-sref=\"ProjectsList\"><i class=\"fa fa-chevron-left\"></i>Powrót</a>\n    </p>\n\n    <section>\n        <div class=\"row\">\n            <section class=\"view__projects-description col-md-6\">\n                <h2>{{ project.current.name }}</h2>\n                <p>{{ project.current.description }}</p>\n            </section>\n\n            <section class=\"view__projects-meta col-md-6\">\n                <!-- <div>\n                    <i class=\"fa fa-clock-o\"></i> <strong>Czas spędzony nad projektem: </strong> <span ng-bind=\"\">[czas]</span>\n                </div> -->\n                <div class=\"meta-row\">\n                    <i class=\"fa fa-key\"></i> <strong>Menedżer projektu: </strong>\n                    <span ng-if=\"project.current.ownername\">{{ project.current.ownername }}</span>\n                    <span ng-if=\"!project.current.ownername\">(brak)</span>\n                </div>\n                <div class=\"meta-row\">\n                    <i class=\"fa fa-calendar-o\"></i> <strong>Deadline: </strong> <span>{{ project.current.duedate | date:\'dd/MM/yyyy HH:mm\' }}</span>\n                </div>\n                <!-- <div>\n                    <i class=\"fa fa-clock-o\"></i> <strong>Uczestnicy: </strong> <span>...</span> <a href=\"#\">Edytuj...</a>\n                </div> -->\n            </section>\n        </div>\n\n        <div>\n            <button class=\"btn\" ng-click=\"project.editor.visible = !project.editor.visible\"\n            ng-class=\"{ \'btn-default\': project.editor.visible, \'btn-primary\': !project.editor.visible }\" ng-disabled=\"!main.tokenData().admin\">\n                <i class=\"fa fa-pencil\"></i> Edytuj\n            </button>\n\n            <button class=\"btn btn-danger\" ng-click=\"project.actions.deleteProject()\" ng-disabled=\"!main.tokenData().admin\">\n                <i class=\"fa fa-times\"></i> Usuń\n            </button>\n        </div>\n\n        <div ng-if=\"project.editor.visible\">\n            <form ng-submit=\"project.actions.save()\" class=\"form-horizontal form-add-user\">\n                <div class=\"form-group\">\n                    <label for=\"newProjectName\" class=\"col-sm-2\">Nazwa projektu</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" ng-model=\"project.current.name\" class=\"form-control\" id=\"newProjectName\" required>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"newProjectDeadline\" class=\"col-sm-2\">Deadline</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" ng-model=\"project.current.duedate\" class=\"form-control\" id=\"newProjectDeadline\" required>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"newProjectManager\" class=\"col-sm-2\">Zarządzca</label>\n                    <div class=\"col-sm-10\">\n                        <select ng-model=\"project.current.owner\" class=\"form-control\" id=\"newProjectDescription\" required>\n                            <option ng-repeat=\"owner in project.owners\" value=\"{{ owner.id }}\">{{ owner.displayname }}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"newProjectDescription\" class=\"col-sm-2\">Opis</label>\n                    <div class=\"col-sm-10\">\n                        <textarea ng-model=\"project.current.description\" class=\"form-control\" id=\"newProjectDescription\" required>\n                        </textarea>\n                    </div>\n                </div>\n                <!-- <div class=\"form-group\">\n                    <label for=\"newProjectDeadline\" class=\"col-sm-2\">Deadline</label>\n                    <div class=\"col-sm-5\">\n                        <input type=\"text\" ng-model=\"project.current.dldate\" placeholder=\"Format: DD/MM/RRRR\"\n                         class=\"form-control\" id=\"newProjectDeadline\" pattern=\"^d{2}/d{2}/d{4}$\" required>\n                    </div>\n                    <div class=\"col-sm-5\">\n                        <input type=\"text\" ng-model=\"project.current.dltime\" class=\"form-control\" placeholder=\"Format: HH:MM\" pattern=\"^d{2}:d{2}$\" required>\n                    </div>\n                </div> -->\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button class=\"btn btn-primary\">Zatwierdź</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </section>\n\n    <section>\n        <h2>Zadania</h2>\n\n        <table class=\"table table-hover\" paginated-table data-posts-per-page=\"8\" data-source=\"project.tasksByProject\">\n            <tr>\n                <th>Lp.</th><th>Nazwa</th><th>Kierownik</th><th>Przydzielono</th><th>Opis</th><th>Status</th><th>% wykonania</th>\n            </tr>\n            <tr ng-repeat=\"task in table.posts\">\n                <td>{{ $index+1 }}</td>\n                <td><a ui-sref=\"TasksSingle({ id: task.id })\">{{ task.name }}</a></td>\n                <td>{{ task.assignername }}</td>\n                <td>{{ task.assigneename }}</td>\n                <td>{{ task.description }}</td>\n                <td>{{ task.status | taskstatus }}</td>\n                <td>{{ task.progress }}%</td>\n            </tr>\n        </table>\n        <div>\n            <button class=\"btn\" ng-click=\"project.addForm.visible = !project.addForm.visible\" ng-disabled=\"!main.tokenData().admin\"\n            ng-class=\"{ \'btn-default\': project.addForm.visible, \'btn-primary\': !project.addForm.visible }\">Dodaj zadanie</button>\n        </div>\n        <div ng-if=\"project.addForm.visible\">\n            <form ng-submit=\"project.actions.addItem()\" class=\"form-horizontal form-add-user\">\n                <div class=\"form-group\">\n                    <label for=\"newTaskName\" class=\"col-sm-2\">Nazwa zadania</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" ng-model=\"project.newItem.name\" class=\"form-control\" id=\"newProjectName\" required>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"newTaskDescription\" class=\"col-sm-2\">Opis</label>\n                    <div class=\"col-sm-10\">\n                        <textarea ng-model=\"project.newItem.description\" class=\"form-control\" id=\"newProjectDescription\" required>\n                        </textarea>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"newTaskAssignee\" class=\"col-sm-2\">Przydziel do</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" id=\"newTaskAssignee\" ng-model=\"project.newItem.assignee\">\n                            <option ng-repeat=\"user in project.owners\" value=\"{{ user.id }}\">{{ user.displayname }}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button class=\"btn btn-primary\" type=\"submit\">Zatwierdź</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </section>\n\n    <section>\n        <h2>Załączniki</h2>\n\n        <table class=\"table table-hover\">\n            <tr>\n                <th>Lp.</th><th>Nazwa</th><th>Autor</th><th>Przesłano</th><th>Typ</th><th>Rozmiar</th><th>Akcje</th>\n            </tr>\n            <tr ng-repeat=\"file in project.filesByProject\">\n                <td>{{ $index+1 }}</td>\n                <td><a href=\"/{{ file.meta.path }}\">{{ file.name }}</a></td>\n                <td>{{ file.authorname }}</td>\n                <td>{{ file.uploaded | date:\'dd/MM/yyyy HH:mm\' }}</td>\n                <td>{{ file.meta.mimetype }}</td>\n                <td>{{ file.meta.size | filesize }}</td>\n                <td>\n                    <button class=\"btn btn-danger\" ng-click=\"project.actions.deleteFile(file)\" ng-disabled=\"!main.tokenData().admin\">\n                        <i class=\"fa fa-times\"></i> Usuń\n                    </button>\n                </td>\n            </tr>\n        </table>\n\n        <form ng-submit=\"project.actions.addFile()\" class=\"form-horizontal form-add-user\" ng-if=\"main.tokenData().admin\">\n            <div class=\"form-group\">\n                <label for=\"newTaskName\" class=\"col-sm-2\">Dodaj załącznik...</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"file\" file-selector=\"project.newFile\" class=\"form-control\" name=\"fileData\">\n                    <button class=\"btn btn-primary\" style=\"margin-top: 10px;\">Załącz</button>\n                </div>\n            </div>\n        </form>\n    </section>\n</div>\n");
$templateCache.put("tasks-single.html","<nav ng-include=\"\'navigation.html\'\" class=\"nav__top\"></nav>\n<div class=\"container view__projects--single\">\n    <!-- <div class=\"row text-right\">\n        <button class=\"btn btn-default\" ng-click=\"main.login.signOut()\">Wyloguj</button>\n    </div> -->\n    <p>\n        <a ui-sref=\"ProjectsSingle({ id: task.current.project })\"><i class=\"fa fa-chevron-left\"></i>Powrót</a>\n    </p>\n\n    <div class=\"row\">\n        <section class=\"view__projects-description col-md-6\">\n            <h2>{{ task.current.name }}</h2>\n            <p>{{ task.current.description }}</p>\n        </section>\n\n        <section class=\"view__projects-meta col-md-6\">\n            <!-- <div>\n                <i class=\"fa fa-clock-o\"></i> <strong>Czas spędzony nad projektem: </strong> <span ng-bind=\"\">[czas]</span>\n            </div> -->\n            <div class=\"meta-row\">\n                <i class=\"fa fa-exclamation\"></i> <strong>Status: </strong> <span>{{ task.current.status | taskstatus }}</span>\n            </div>\n            <div class=\"meta-row\">\n                <i class=\"fa fa-user\"></i> <strong>Przydzielono: </strong> <span>{{ task.current.assigneename }}</span>\n            </div>\n            <div class=\"meta-row\">\n                <i class=\"fa fa-tasks\"></i> <strong>Stopień ukończenia: </strong> <span>{{ task.current.progress }}%</span>\n            </div>\n            <div class=\"meta-row\">\n                <strong>Oznacz zadanie jako: </strong>\n                <button class=\"btn btn-primary\" ng-click=\"task.actions.markAs(\'new\')\">Nowe</button>\n                <button class=\"btn btn-warning\" ng-click=\"task.actions.markAs(\'in progress\')\">W trakcie</button>\n                <button class=\"btn btn-success\" ng-click=\"task.actions.markAs(\'done\')\">Ukończone</button>\n            </div>\n            <!-- <div>\n                <i class=\"fa fa-clock-o\"></i> <strong>Uczestnicy: </strong> <span>...</span> <a href=\"#\">Edytuj...</a>\n            </div> -->\n        </section>\n    </div>\n\n    <div>\n        <button class=\"btn\" ng-click=\"project.editor.visible = !project.editor.visible\"\n        ng-class=\"{ \'btn-default\': project.editor.visible, \'btn-primary\': !project.editor.visible }\" ng-disabled=\"!main.tokenData().admin\">\n            <i class=\"fa fa-pencil\"></i> Edytuj\n        </button>\n\n        <button class=\"btn btn-danger\" ng-click=\"task.actions.deleteTask()\"><i class=\"fa fa-times\"></i> Usuń</button>\n    </div>\n\n    <div ng-if=\"project.editor.visible\">\n        <form ng-submit=\"task.actions.save()\" class=\"form-horizontal form-add-user\">\n            <div class=\"form-group\">\n                <label for=\"newProjectName\" class=\"col-sm-2\">Nazwa zadania</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"text\" ng-model=\"task.current.name\" class=\"form-control\" id=\"newProjectName\" required>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"newProjectManager\" class=\"col-sm-2\">Przydzielono</label>\n                <div class=\"col-sm-10\">\n                    <select ng-model=\"task.current.assignee\" class=\"form-control\" id=\"newProjectDescription\" required>\n                        <option ng-repeat=\"owner in task.owners\" value=\"{{ owner.id }}\">{{ owner.displayname }}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"newProjectName\" class=\"col-sm-2\">Stopień ukończenia (%)</label>\n                <div class=\"col-sm-10\">\n                    <input type=\"number\" ng-model=\"task.current.progress\" class=\"form-control\" id=\"newProjectName\" required>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"newProjectDescription\" class=\"col-sm-2\">Opis</label>\n                <div class=\"col-sm-10\">\n                    <textarea ng-model=\"task.current.description\" class=\"form-control\" id=\"newProjectDescription\" required>\n                    </textarea>\n                </div>\n            </div>\n            <!-- <div class=\"form-group\">\n                <label for=\"newProjectDeadline\" class=\"col-sm-2\">Deadline</label>\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" ng-model=\"project.current.dldate\" placeholder=\"Format: DD/MM/RRRR\"\n                     class=\"form-control\" id=\"newProjectDeadline\" pattern=\"^d{2}/d{2}/d{4}$\" required>\n                </div>\n                <div class=\"col-sm-5\">\n                    <input type=\"text\" ng-model=\"project.current.dltime\" class=\"form-control\" placeholder=\"Format: HH:MM\" pattern=\"^d{2}:d{2}$\" required>\n                </div>\n            </div> -->\n            <div class=\"form-group\">\n                <div class=\"col-sm-offset-2 col-sm-10\">\n                    <button class=\"btn btn-primary\">Zatwierdź</button>\n                </div>\n            </div>\n        </form>\n    </div>\n\n</div>\n");
$templateCache.put("users.html","<nav ng-include=\"\'navigation.html\'\" class=\"nav__top\"></nav>\n<div class=\"container view__users\">\n    <!-- <div class=\"row text-right\">\n        <button class=\"btn btn-default\" ng-click=\"main.login.signOut()\">Wyloguj</button>\n    </div> -->\n\n    <h2>Użytkownicy</h2>\n    <!-- <ul>\n        <li ng-repeat=\"user in users.list\">{{ user.displayname }}</li>\n    </ul> -->\n\n    <table class=\"table table-hover\" paginated-table data-posts-per-page=\"8\" data-source=\"users.list\">\n        <tr>\n            <th>Lp.</th><th>Login</th><th>Imię i nazwisko</th><th>Dodano</th><th>Admin?</th><th>Akcje</th>\n        </tr>\n        <tr ng-repeat=\"user in table.posts\">\n            <td>{{ $index+1 }}</td>\n            <td>{{ user.name }}</td>\n            <td>\n                <input type=\"text\" class=\"form-control\" ng-model=\"user.displayname\">\n            </td>\n            <td>{{ user.joined | date:\'dd/MM/yyyy HH:mm\' }}</td>\n            <td>\n                <input type=\"checkbox\" ng-model=\"user.admin\" ng-true-value=\"1\" ng-false-value=\"0\"\n                ng-disabled=\"!main.tokenData().admin\">\n            </td>\n            <td>\n                <button class=\"btn btn-default\" ng-click=\"users.actions.save(user)\">\n                    <i class=\"fa fa-check\"></i> Zapisz\n                </button>\n                <button class=\"btn btn-danger\" ng-click=\"users.actions.remove(user)\" ng-disabled=\"!main.tokenData().admin\">\n                    <i class=\"fa fa-times\"></i> Usuń\n                </button>\n            </td>\n        </tr>\n    </table>\n    <div>\n        <button class=\"btn\" ng-click=\"users.addForm.visible = !users.addForm.visible\" ng-disabled=\"!main.tokenData().admin\"\n        ng-class=\"{ \'btn-default\': users.addForm.visible, \'btn-primary\': !users.addForm.visible }\"><i class=\"fa fa-plus\"></i> Dodaj użytkownika</button>\n    </div>\n    <div ng-if=\"users.addForm.visible\">\n        <form ng-submit=\"users.actions.add()\" class=\"form-inline form-add-user\">\n            <div class=\"form-group\">\n                <input type=\"text\" ng-model=\"users.newUser.userName\" placeholder=\"Login\" class=\"form-control\" required>\n                <input type=\"password\" ng-model=\"users.newUser.userPass\" placeholder=\"Hasło\" class=\"form-control\" required>\n                <input type=\"text\" ng-model=\"users.newUser.displayName\" placeholder=\"Imię i nazwisko\" class=\"form-control\" required>\n                <div class=\"checkbox\">\n                    <label><input type=\"checkbox\" ng-model=\"users.newUser.isAdmin\"> Administrator</label>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <button type=\"submit\" class=\"btn btn-primary\">Dodaj</button>\n            </div>\n        </form>\n    </div>\n</div>\n");
$templateCache.put("directives/example.html","<div class=\"example-directive\">\n  <h1>Directive title: {{title}}</h1>\n  <p>This is an example of a directive, click me!</p>\n</div>\n");
$templateCache.put("directives/paginated-table.html","<div class=\"table__pagination\">\n    <button class=\"btn\" ng-disabled=\"!table.canNavigate.back\" ng-click=\"table.navigate(table.activePage-1)\" ng-if=\"table.pages.length > 0\">\n        <i class=\"fa fa-chevron-left\"></i>\n    </button>\n    <button class=\"btn\" ng-class=\"{ \'btn-primary\': page.active }\" ng-repeat=\"page in table.pages\" ng-click=\"table.navigate(page.index)\">\n        {{ page.label }}\n    </button>\n    <button class=\"btn\" ng-disabled=\"!table.canNavigate.forward\" ng-click=\"table.navigate(table.activePage+1)\" ng-if=\"table.pages.length > 0\">\n        <i class=\"fa fa-chevron-right\"></i>\n    </button>\n</div>\n");}]);